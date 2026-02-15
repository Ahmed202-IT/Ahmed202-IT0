import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, addStudent, deleteStudent, updateStudent } from '../features/studentsSlice';
import { Trash2, UserPlus, Search, Edit2, X, Check } from 'lucide-react';
import { useToast } from '../components/Toast';

const Students = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { list: students } = useSelector((state) => state.students);
    const [newStudent, setNewStudent] = useState({ name: '', age: '', status: 'Active' });
    const [editingStudent, setEditingStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const handleAddStudent = (e) => {
        e.preventDefault();
        if (newStudent.name && newStudent.age) {
            dispatch(addStudent({ ...newStudent, role: 'student', grade: 'N/A' })).then(() => {
                addToast('Student added successfully!', 'success');
            });
            setNewStudent({ name: '', age: '', status: 'Active' });
        }
    };

    const handleUpdateStudent = (e) => {
        e.preventDefault();
        if (editingStudent.name && editingStudent.age) {
            dispatch(updateStudent(editingStudent)).then(() => {
                addToast('Student updated successfully!', 'success');
                setEditingStudent(null);
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            dispatch(deleteStudent(id)).then(() => {
                addToast('Student deleted successfully!', 'info');
            });
        }
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800">Students</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Age</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    editingStudent?.id === student.id ? (
                                        <tr key={student.id} className="bg-blue-50">
                                            <td className="p-2"><input className="w-full p-1 border rounded" value={editingStudent.name} onChange={e => setEditingStudent({ ...editingStudent, name: e.target.value })} /></td>
                                            <td className="p-2"><input className="w-full p-1 border rounded" type="number" value={editingStudent.age} onChange={e => setEditingStudent({ ...editingStudent, age: e.target.value })} /></td>
                                            <td className="p-2">
                                                <select className="w-full p-1 border rounded" value={editingStudent.status} onChange={e => setEditingStudent({ ...editingStudent, status: e.target.value })}>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </td>
                                            <td className="p-2 flex justify-center gap-2">
                                                <button onClick={handleUpdateStudent} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"><Check size={16} /></button>
                                                <button onClick={() => setEditingStudent(null)} className="p-2 bg-slate-400 text-white rounded-full hover:bg-slate-500"><X size={16} /></button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 font-medium text-slate-800">{student.name}</td>
                                            <td className="p-4 text-slate-600">{student.age}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center flex justify-center gap-2">
                                                <button
                                                    onClick={() => setEditingStudent(student)}
                                                    className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student.id)}
                                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-500">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <UserPlus size={20} className="text-blue-500" />
                        Add New Student
                    </h3>
                    <form onSubmit={handleAddStudent} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={newStudent.age}
                                onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={newStudent.status}
                                onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                            Add Student
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Students;
