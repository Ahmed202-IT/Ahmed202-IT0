import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../features/studentsSlice';
import { fetchTeachers } from '../features/teachersSlice';
import { Users, GraduationCap, CalendarCheck, UserPlus, BookOpen, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list: students } = useSelector((state) => state.students);
    const { list: teachers } = useSelector((state) => state.teachers);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchStudents());
        dispatch(fetchTeachers());
    }, [dispatch]);

    // Calculate stats
    const totalStudents = students.length;
    const totalTeachers = teachers.length;
    const activeStudents = students.filter(s => s.status === 'Active').length;

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Total Students</p>
                        <h3 className="text-3xl font-bold text-slate-800">{totalStudents}</h3>
                        <p className="text-green-500 text-xs mt-1">{activeStudents} Active</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <GraduationCap size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Total Teachers</p>
                        <h3 className="text-3xl font-bold text-slate-800">{totalTeachers}</h3>
                        <p className="text-purple-500 text-xs mt-1">Manage Staff</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                        <Users size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Attendance Rate</p>
                        <h3 className="text-3xl font-bold text-slate-800">85%</h3>
                        <p className="text-slate-400 text-xs mt-1">System Wide</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                        <CalendarCheck size={24} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/students')}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all border border-blue-100 shadow-sm"
                        >
                            <UserPlus size={24} />
                            <span className="text-sm font-bold">Add Student</span>
                        </button>
                        <button
                            onClick={() => navigate('/teachers')}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all border border-purple-100 shadow-sm"
                        >
                            <UserPlus size={24} />
                            <span className="text-sm font-bold">Add Teacher</span>
                        </button>
                        <button
                            onClick={() => navigate('/courses')}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all border border-emerald-100 shadow-sm"
                        >
                            <BookOpen size={24} />
                            <span className="text-sm font-bold">Manage Courses</span>
                        </button>
                        <button
                            onClick={() => navigate('/attendance')}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 transition-all border border-orange-100 shadow-sm"
                        >
                            <CalendarCheck size={24} />
                            <span className="text-sm font-bold">Track Attendance</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-800">Recent Students</h3>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-7 pr-2 py-1 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-32"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <ul className="divide-y divide-slate-100">
                        {filteredStudents.map(student => (
                            <li key={student.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{student.name}</p>
                                    <p className="text-xs text-slate-400">ID: {student.id}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {student.status}
                                </span>
                            </li>
                        ))}
                        {filteredStudents.length === 0 && (
                            <li className="py-10 text-center text-slate-400 text-sm italic">No students found.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
