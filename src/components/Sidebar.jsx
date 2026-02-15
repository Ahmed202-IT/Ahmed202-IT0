import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, CalendarCheck, BookOpen, LogOut, FileText, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const getNavItems = (role) => {
        switch (role) {
            case 'admin':
                return [
                    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
                    { path: '/students', label: 'Students', icon: GraduationCap },
                    { path: '/teachers', label: 'Teachers', icon: Users },
                    { path: '/courses', label: 'Courses', icon: BookOpen },
                    { path: '/attendance', label: 'Attendance', icon: CalendarCheck },
                    { path: '/profile', label: 'My Profile', icon: User },
                ];
            case 'teacher':
                return [
                    { path: '/teacher/dashboard', label: 'My Classes', icon: LayoutDashboard },
                    { path: '/teacher/attendance', label: 'Attendance', icon: CalendarCheck },
                    { path: '/teacher/grades', label: 'Grades', icon: FileText },
                    { path: '/profile', label: 'My Profile', icon: User },
                ];
            case 'student':
                return [
                    { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { path: '/profile', label: 'My Profile', icon: User },
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems(user?.role);

    return (
        <div className="bg-slate-900 text-white w-64 min-h-screen flex flex-col transition-all duration-300 shadow-xl z-20">
            <div className="p-6 border-b border-slate-800 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold tracking-wider text-blue-400">School<span className="text-white">MS</span></h1>
                <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">{user?.role} Portal</span>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20 translate-x-1'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
                                        <span className="font-medium">{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
