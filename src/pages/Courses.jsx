import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, addCourse, deleteCourse } from '../features/coursesSlice';
import { fetchTeachers } from '../features/teachersSlice';
import { BookOpen, Plus, Trash2, Clock, Users, Search } from 'lucide-react';
import { useToast } from '../components/Toast';

const Courses = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { list: courses, status } = useSelector((state) => state.courses);
    const { list: teachers } = useSelector((state) => state.teachers);
    const [newCourse, setNewCourse] = useState({ name: '', teacherId: '', gradeLevel: '', schedule: '' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCourses());
        }
        dispatch(fetchTeachers());
    }, [dispatch, status]);

    const handleAddCourse = (e) => {
        e.preventDefault();
        if (newCourse.name && newCourse.teacherId) {
            dispatch(addCourse(newCourse)).then(() => {
                addToast('New course created successfully!', 'success');
            });
            setNewCourse({ name: '', teacherId: '', gradeLevel: '', schedule: '' });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            dispatch(deleteCourse(id)).then(() => {
                addToast('Course has been removed.', 'info');
            });
        }
    };

    const getTeacherName = (id) => {
        const teacher = teachers.find(t => t.id === id);
        return teacher ? teacher.name : 'Unknown';
    };

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-slate-800">Course Management</h1>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <BookOpen size={24} />
                                </div>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                    title="Delete Course"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1">{course.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">{course.gradeLevel}</p>

                            <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-slate-400" />
                                    <span>{getTeacherName(course.teacherId)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-slate-400" />
                                    <span>{course.schedule}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredCourses.length === 0 && (
                        <div className="col-span-full bg-slate-50 rounded-xl p-10 text-center text-slate-500 border-2 border-dashed border-slate-200">
                            No courses found matching your search.
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg h-fit border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Plus size={20} className="text-blue-600" />
                        Create New Course
                    </h3>
                    <form onSubmit={handleAddCourse} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Course Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={newCourse.name}
                                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                                placeholder="e.g. Mathematics"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Teacher</label>
                            <select
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={newCourse.teacherId}
                                onChange={(e) => setNewCourse({ ...newCourse, teacherId: e.target.value })}
                                required
                            >
                                <option value="">Select Teacher</option>
                                {teachers.map(t => (
                                    <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={newCourse.gradeLevel}
                                onChange={(e) => setNewCourse({ ...newCourse, gradeLevel: e.target.value })}
                                placeholder="e.g. 10th Grade"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Schedule</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={newCourse.schedule}
                                onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                                placeholder="e.g. Mon/Wed 10:00 AM"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                        >
                            Create Course
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Courses;
