import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../features/coursesSlice';
import { fetchStudents } from '../features/studentsSlice';
import { BookOpen, Users } from 'lucide-react';

const TeacherDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { list: allCourses } = useSelector((state) => state.courses);
    const { list: allStudents } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchStudents());
    }, [dispatch]);

    // Only show courses assigned to this teacher
    const myCourses = allCourses.filter(c => c.teacherId === user?.id);

    // Get student count for each course (in a real app we'd check enrollments)
    // For now, let's just show count of students in the same grade as the course
    const getStudentCount = (gradeLevel) => {
        return allStudents.filter(s => s.grade === gradeLevel).length;
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Hello, {user?.name}</h1>
            <p className="text-slate-500">Here are your assigned classes.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map(course => (
                    <div key={course.id} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-500 hover:shadow-lg transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-slate-800">{course.name}</h3>
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <BookOpen size={20} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Grade Level</span>
                                <span className="font-medium text-slate-700">{course.grade}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Students</span>
                                <span className="font-medium text-slate-700 flex items-center gap-1">
                                    <Users size={14} /> {getStudentCount(course.gradeLevel)}
                                </span>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 font-medium transition-colors">
                            View Class
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherDashboard;
