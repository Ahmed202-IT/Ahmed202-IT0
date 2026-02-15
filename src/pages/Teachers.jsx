import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeachers, addTeacher, deleteTeacher, updateTeacher } from '../features/teachersSlice';
import { Trash2, UserPlus, Search, Mail, Edit2, X, Check } from 'lucide-react';
import { useToast } from '../components/Toast';

const Teachers = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { list: teachers } = useSelector((state) => state.teachers);
    const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', contact: '' });
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchTeachers());
    }, [dispatch]);

    const handleAddTeacher = (e) => {
        e.preventDefault();
        if (newTeacher.name && newTeacher.subject) {
            dispatch(addTeacher(newTeacher)).then(() => {
                addToast('Teacher added successfully!', 'success');
            });
            setNewTeacher({ name: '', subject: '', contact: '' });
        }
    };

    const handleUpdateTeacher = (e) => {
        e.preventDefault();
        if (editingTeacher.name && editingTeacher.subject) {
            dispatch(updateTeacher(editingTeacher)).then(() => {
                addToast('Teacher updated successfully!', 'success');
                setEditingTeacher(null);
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            dispatch(deleteTeacher(id)).then(() => {
                addToast('Teacher removed from records.', 'info');
            });
        }
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800">Teachers</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search teachers..."
                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Teacher List */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTeachers.map((teacher) => (
                                editingTeacher?.id === teacher.id ? (
                                    <tr key={teacher.id} className="bg-purple-50">
                                        <td className="p-2">
                                            <input className="w-full p-1 border rounded" value={editingTeacher.name} onChange={e => setEditingTeacher({ ...editingTeacher, name: e.target.value })} />
                                        </td>
                                        <td className="p-2">
                                            <input className="w-full p-1 border rounded" value={editingTeacher.subject} onChange={e => setEditingTeacher({ ...editingTeacher, subject: e.target.value })} />
                                        </td>
                                        <td className="p-2">
                                            <input className="w-full p-1 border rounded" value={editingTeacher.contact} onChange={e => setEditingTeacher({ ...editingTeacher, contact: e.target.value })} />
                                        </td>
                                        <td className="p-2 text-center flex justify-center gap-2">
                                            <button onClick={handleUpdateTeacher} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"><Check size={16} /></button>
                                            <button onClick={() => setEditingTeacher(null)} className="p-2 bg-slate-400 text-white rounded-full hover:bg-slate-500"><X size={16} /></button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 font-medium text-slate-800">{teacher.name}</td>
                                        <td className="p-4">
                                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                                                {teacher.subject}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-600 flex items-center gap-2">
                                            <Mail size={16} /> {teacher.contact}
                                        </td>
                                        <td className="p-4 text-center flex justify-center gap-2">
                                            <button
                                                onClick={() => setEditingTeacher(teacher)}
                                                className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(teacher.id)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            ))}
                            {filteredTeachers.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-500">
                                        No teachers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Add Teacher Form */}
                <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <UserPlus size={20} className="text-purple-500" />
                        Add New Teacher
                    </h3>
                    <form onSubmit={handleAddTeacher} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                value={newTeacher.name}
                                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                value={newTeacher.subject}
                                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                value={newTeacher.contact}
                                onChange={(e) => setNewTeacher({ ...newTeacher, contact: e.target.value })}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                            Add Teacher
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Teachers;
