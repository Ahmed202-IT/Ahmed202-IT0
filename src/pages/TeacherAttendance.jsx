import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAttendance, fetchAttendance } from '../features/attendanceSlice';
import { fetchStudents } from '../features/studentsSlice';
import { fetchCourses } from '../features/coursesSlice';
import { Check, X, Calendar, Search } from 'lucide-react';
import { useToast } from '../components/Toast';

const TeacherAttendance = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { list: attendance } = useSelector((state) => state.attendance);
    const { list: students } = useSelector((state) => state.students);
    const { list: courses } = useSelector((state) => state.courses);
    const { user } = useSelector((state) => state.auth);

    const [selectedCourse, setSelectedCourse] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchAttendance());
        dispatch(fetchStudents());
        dispatch(fetchCourses());
    }, [dispatch]);

    const myCourses = user?.id ? courses.filter(c => c.teacherId === user.id) : [];

    const courseStudents = selectedCourse ? students.filter(s => {
        const course = courses.find(c => c.id === selectedCourse);
        const matchesCourse = course ? s.grade === course.gradeLevel : false;
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCourse && matchesSearch;
    }) : [];

    const handleMark = (studentId, status) => {
        if (selectedCourse) {
            dispatch(markAttendance({
                studentId,
                courseId: selectedCourse,
                date,
                status,
                teacherId: user.id
            })).then(() => {
                addToast('Attendance updated.', 'success');
            });
        }
    };

    const getStatus = (studentId) => {
        const record = attendance.find(a =>
            a.studentId === studentId &&
            a.courseId === selectedCourse &&
            a.date === date
        );
        return record ? record.status : null;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h1 className="text-3xl font-bold text-slate-800">Class Attendance</h1>
                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none lg:w-48">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Student name..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none pr-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <input
                        type="date"
                        className="flex-1 lg:flex-none px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <select
                        className="flex-1 lg:flex-none px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">Select Class...</option>
                        {myCourses.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedCourse ? (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-indigo-50 text-indigo-900 uppercase text-xs font-semibold">
                            <tr>
                                <th className="p-4">Student Name</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {courseStudents.map(student => {
                                const status = getStatus(student.id);
                                return (
                                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 font-medium text-slate-800">{student.name}</td>
                                        <td className="p-4 text-center">
                                            {status ? (
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {status}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-xs italic">Pending</span>
                                            )}
                                        </td>
                                        <td className="p-4 flex justify-center gap-2">
                                            <button
                                                onClick={() => handleMark(student.id, 'Present')}
                                                className={`p-2 rounded-lg transition-all duration-200 ${status === 'Present' ? 'bg-green-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-400 hover:text-green-600 hover:bg-green-50'
                                                    }`}
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleMark(student.id, 'Absent')}
                                                className={`p-2 rounded-lg transition-all duration-200 ${status === 'Absent' ? 'bg-red-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-400 hover:text-red-600 hover:bg-red-50'
                                                    }`}
                                            >
                                                <X size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {courseStudents.length === 0 && (
                        <div className="p-12 text-center text-slate-500 bg-slate-50 border-t border-slate-100">
                            No students found matching your class and search criteria.
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-16 text-center text-slate-400 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                    <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">Please select a class from the dropdown to manage attendance.</p>
                </div>
            )}
        </div>
    );
};

export default TeacherAttendance;
