import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGrades } from '../features/gradesSlice';
import { fetchAttendance } from '../features/attendanceSlice';
import { fetchCourses } from '../features/coursesSlice';
import { BookOpen, Calendar, Bell } from 'lucide-react';
import { useToast } from '../components/Toast';

const StudentDashboard = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { user } = useSelector((state) => state.auth);
    // Safe selectors
    const gradesState = useSelector((state) => state.grades) || {};
    const attendanceState = useSelector((state) => state.attendance) || {};
    const coursesState = useSelector((state) => state.courses) || {};

    const grades = gradesState.list || [];
    const attendance = attendanceState.list || [];
    const courses = coursesState.list || [];

    useEffect(() => {
        dispatch(fetchGrades());
        dispatch(fetchAttendance());
        dispatch(fetchCourses());

        if (user) {
            addToast(`Logged in as ${user.name}`, 'info');
        }
    }, [dispatch, user]);

    if (!user) {
        return <div className="p-8 text-center text-slate-500">Loading User Profile...</div>;
    }

    // Safe getters
    const getCourseName = (id) => {
        const course = courses.find(c => c.id === id);
        return course ? course.name : 'Unknown';
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
                <p className="opacity-90">Student Portal</p>
                <div className="mt-4 flex gap-6">
                    <div>
                        <span className="block text-sm opacity-75">Academic Status</span>
                        <span className="font-bold text-xl flex items-center gap-2">
                            <Bell
                                size={20}
                                className="animate-pulse cursor-pointer hover:text-blue-200 transition-colors"
                                onClick={() => addToast('You have no new notifications.', 'info')}
                            /> All Up to Date
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grades Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-blue-500" /> Grades
                    </h2>
                    <div className="space-y-3">
                        {grades.filter(g => g.studentId === user.id).map(g => (
                            <div key={g.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-800">{getCourseName(g.courseId)}</p>
                                    <p className="text-xs text-slate-500">{g.type}</p>
                                </div>
                                <span className="font-bold text-blue-600">{g.score}</span>
                            </div>
                        ))}
                        {grades.filter(g => g.studentId === user.id).length === 0 && (
                            <p className="text-slate-400 text-sm">No grades found.</p>
                        )}
                    </div>
                </div>

                {/* Attendance Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-green-500" /> Attendance
                    </h2>
                    <div className="space-y-3">
                        {attendance.filter(a => a.studentId === user.id).map(a => (
                            <div key={a.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-800">{a.date}</p>
                                    <p className="text-xs text-slate-500">{getCourseName(a.courseId)}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded font-bold ${a.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {a.status}
                                </span>
                            </div>
                        ))}
                        {attendance.filter(a => a.studentId === user.id).length === 0 && (
                            <p className="text-slate-400 text-sm">No attendance records.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
