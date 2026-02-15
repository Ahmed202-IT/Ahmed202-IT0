import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGrades, addGrade, deleteGrade } from '../features/gradesSlice';
import { fetchStudents } from '../features/studentsSlice';
import { fetchCourses } from '../features/coursesSlice';
import { Save, Search, Trash2 } from 'lucide-react';
import { useToast } from '../components/Toast';

const TeacherGrades = () => {
    const dispatch = useDispatch();
    const { list: grades } = useSelector((state) => state.grades);
    const { list: students } = useSelector((state) => state.students);
    const { list: courses } = useSelector((state) => state.courses);
    const { user } = useSelector((state) => state.auth);
    const { addToast } = useToast();

    const [selectedCourse, setSelectedCourse] = useState('');
    const [gradeInput, setGradeInput] = useState({});

    useEffect(() => {
        dispatch(fetchGrades());
        dispatch(fetchStudents());
        dispatch(fetchCourses());
    }, [dispatch]);

    const myCourses = user?.id ? courses.filter(c => c.teacherId === user.id) : [];

    const handleGradeChange = (studentId, value) => {
        setGradeInput({ ...gradeInput, [studentId]: value });
    };

    const handleSaveGrade = (studentId) => {
        const score = gradeInput[studentId];
        if (score && selectedCourse) {
            dispatch(addGrade({
                studentId,
                courseId: selectedCourse,
                score: parseInt(score),
                maxScore: 100,
                type: 'Final',
                date: new Date().toISOString().split('T')[0]
            })).then(() => {
                addToast('Grade successfully recorded!', 'success');
                setGradeInput({ ...gradeInput, [studentId]: '' });
            });
        }
    };

    const handleDeleteGrade = (studentId) => {
        const grade = grades.find(g => g.studentId === studentId && g.courseId === selectedCourse);
        if (grade && window.confirm('Are you sure you want to delete this grade record?')) {
            dispatch(deleteGrade(grade.id)).then(() => {
                addToast('Grade record removed.', 'info');
            });
        }
    };

    const getStudentGrade = (studentId) => {
        const grade = grades.find(g => g.studentId === studentId && g.courseId === selectedCourse);
        return grade ? grade.score : '';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800">Student Grading</h1>
                <div className="w-64">
                    <select
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">Select Class...</option>
                        {myCourses.map(c => (
                            <option key={c.id} value={c.id}>{c.name} ({c.gradeLevel})</option>
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
                                <th className="p-4">Current Grade</th>
                                <th className="p-4">Input Score (0-100)</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {students.filter(s => {
                                const course = courses.find(c => c.id === selectedCourse);
                                return course ? s.grade === course.gradeLevel : true;
                            }).map(student => {
                                const existingGrade = getStudentGrade(student.id);
                                return (
                                    <tr key={student.id} className="hover:bg-slate-50">
                                        <td className="p-4 font-medium text-slate-800">{student.name}</td>
                                        <td className="p-4">
                                            {existingGrade !== '' ? (
                                                <span className="font-bold text-indigo-600">{existingGrade}/100</span>
                                            ) : (
                                                <span className="text-slate-400 italic">Not graded</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                className="w-24 p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                                placeholder={existingGrade || "Score"}
                                                value={gradeInput[student.id] || ''}
                                                onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                            />
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleSaveGrade(student.id)}
                                                className="text-indigo-600 hover:text-indigo-800 p-2 hover:bg-indigo-50 rounded-full transition-colors"
                                                title="Save Grade"
                                            >
                                                <Save size={20} />
                                            </button>
                                            {existingGrade !== '' && (
                                                <button
                                                    onClick={() => handleDeleteGrade(student.id)}
                                                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors ml-1"
                                                    title="Delete Grade"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {students.filter(s => {
                        const course = courses.find(c => c.id === selectedCourse);
                        return course ? s.grade === course.gradeLevel : true;
                    }).length === 0 && (
                            <div className="p-8 text-center text-slate-500">No students found for this grade level.</div>
                        )}
                </div>
            ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400">
                    <Search size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Select a class above to start grading.</p>
                </div>
            )}
        </div>
    );
};

export default TeacherGrades;
