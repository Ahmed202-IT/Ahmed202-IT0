import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { Bell, Search } from 'lucide-react';

const Layout = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center z-10 border-b border-slate-100">
                    <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 w-96">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-600"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {user?.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-8 scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
