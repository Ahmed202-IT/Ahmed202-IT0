import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Shield, Book, Award, Save } from 'lucide-react';
import { useToast } from '../components/Toast';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { addToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const handleSave = () => {
        // In a real app, this would dispatch an update action to the backend
        addToast('Profile updated successfully!', 'success');
        setIsEditing(false);
    };

    if (!user) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 flex items-end gap-6 mb-8">
                        <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg">
                            <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                <User size={64} />
                            </div>
                        </div>
                        <div className="pb-2">
                            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Account Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg disabled:bg-slate-50 disabled:border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg disabled:bg-slate-50 disabled:border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Role Details</h3>
                            <div className="bg-slate-50 p-6 rounded-xl space-y-4">
                                {user.role === 'admin' && (
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Shield className="text-blue-500" />
                                        <div>
                                            <p className="font-bold">System Administrator</p>
                                            <p className="text-xs text-slate-500">Full Access Privileges</p>
                                        </div>
                                    </div>
                                )}
                                {user.role === 'teacher' && (
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Book className="text-purple-500" />
                                        <div>
                                            <p className="font-bold">{user.subject} Department</p>
                                            <p className="text-xs text-slate-500">Faculty Member</p>
                                        </div>
                                    </div>
                                )}
                                {user.role === 'student' && (
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Award className="text-orange-500" />
                                        <div>
                                            <p className="font-bold">Grade: {user.grade}</p>
                                            <p className="text-xs text-slate-500">Active Enrollment</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t flex justify-end">
                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/30"
                            >
                                <Save size={20} /> Save Changes
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition-all font-bold"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
