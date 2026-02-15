import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, ArrowRight, Book, Users, Award } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-blue-600">
                    <School size={32} />
                    <span className="text-2xl font-bold text-slate-800">School<span className="text-blue-600">MS</span></span>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 text-slate-600 font-medium hover:text-blue-600 transition-colors"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                        Manage your school <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            with confidence.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                        Streamline administration, empower teachers, and engage students with our all-in-one school management platform.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-500/20"
                        >
                            Access Portal <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all border border-slate-200">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
                    <img
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        alt="School Students"
                        className="rounded-3xl shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-all duration-500"
                    />
                </div>
            </header>

            {/* Features */}
            <section className="bg-slate-50 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-800">Why choose SchoolMS?</h2>
                        <p className="text-slate-500 mt-4">Everything you need to run your educational institution effectively.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Role-Based Access</h3>
                            <p className="text-slate-500">Secure portals for Admins, Teachers, and Students with dedicated features for each.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                                <Book size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Course Management</h3>
                            <p className="text-slate-500">Easily organize classes, subjects, and schedules to keep everyone on track.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6">
                                <Award size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Grading & Attendance</h3>
                            <p className="text-slate-500">Efficiently track student performance and daily attendance records.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-white py-12 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
                    <p>&copy; 2024 School Management System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
