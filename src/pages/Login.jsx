import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, School } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(resultAction)) {
            const user = resultAction.payload;
            if (user.role === 'admin') navigate('/dashboard');
            else if (user.role === 'teacher') navigate('/teacher/dashboard');
            else if (user.role === 'student') navigate('/student/dashboard');
            else navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-8 text-center bg-slate-50 border-b border-slate-100">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <School className="text-blue-600" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
                    <p className="text-slate-500 mt-2">Sign in to School Management System</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">
                            User not found. Try admin@school.com / admin
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="admin@school.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/30"
                    >
                        {status === 'loading' ? 'Signing in...' : 'Sign In'}
                        <ChevronRight className={`transition-transform duration-300 ${status !== 'loading' ? 'group-hover:translate-x-1' : ''}`} size={20} />
                    </button>

                    <div className="text-center text-xs text-slate-400 mt-6">
                        <p>Demo Credentials:</p>
                        <div className="mt-2 space-x-2">
                            <span className="bg-slate-100 px-2 py-1 rounded">admin@school.com</span>
                            <span className="bg-slate-100 px-2 py-1 rounded">teacher@school.com</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
