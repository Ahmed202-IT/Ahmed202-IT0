import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAttendance, fetchAttendance } from '../features/attendanceSlice';
import { fetchStudents } from '../features/studentsSlice';
import { Check, X, Calendar, Search } from 'lucide-react';
import { useToast } from '../components/Toast';

const Attendance = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { list: students } = useSelector((state) => state.students);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceStatus, setAttendanceStatus] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const handleMark = (studentId, status) => {
        setAttendanceStatus({ ...attendanceStatus, [studentId]: status });
    };

    const handleSave = () => {
        const markedCount = Object.keys(attendanceStatus).length;
        if (markedCount === 0) {
            addToast('No attendance marked to save.', 'error');
            return;
        }

        Object.entries(attendanceStatus).forEach(([studentId, status]) => {
            dispatch(markAttendance({ studentId, date, status }));
        });

        addToast(`Attendance for ${markedCount} students saved!`, 'success');
        setAttendanceStatus({});
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-slate-800">Attendance Tracker</h1>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                        <Calendar size={18} className="text-slate-500" />
                        <input
                            type="date"
                            className="outline-none text-slate-700 font-medium"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
                        <tr>
                            <th className="p-4">Student Name</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Mark Attendance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium text-slate-800">{student.name}</td>
                                <td className="p-4 text-center">
                                    {attendanceStatus[student.id] ? (
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${attendanceStatus[student.id] === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {attendanceStatus[student.id]}
                                        </span>
                                    ) : (
                                        <span className="text-slate-400 text-xs italic">Not Marked</span>
                                    )}
                                </td>
                                <td className="p-4 flex justify-center gap-3">
                                    <button
                                        onClick={() => handleMark(student.id, 'Present')}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${attendanceStatus[student.id] === 'Present'
                                            ? 'bg-green-500 text-white shadow-md'
                                            : 'bg-slate-100 text-slate-600 hover:bg-green-100 hover:text-green-600'
                                            }`}
                                    >
                                        <Check size={16} /> Present
                                    </button>
                                    <button
                                        onClick={() => handleMark(student.id, 'Absent')}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${attendanceStatus[student.id] === 'Absent'
                                            ? 'bg-red-500 text-white shadow-md'
                                            : 'bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600'
                                            }`}
                                    >
                                        <X size={16} /> Absent
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-10 text-center text-slate-500">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {filteredStudents.length > 0 && (
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                        >
                            Save Attendance
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attendance;
