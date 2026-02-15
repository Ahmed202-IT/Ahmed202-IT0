import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Courses from './pages/Courses';
import Attendance from './pages/Attendance';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherAttendance from './pages/TeacherAttendance';
import TeacherGrades from './pages/TeacherGrades';
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from './features/studentsSlice';
import { fetchTeachers } from './features/teachersSlice';
import { fetchAttendance } from './features/attendanceSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchStudents());
      dispatch(fetchTeachers());
      dispatch(fetchAttendance());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Layout Routes */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        {/* Admin Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/students" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Students />
          </ProtectedRoute>
        } />
        <Route path="/teachers" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Teachers />
          </ProtectedRoute>
        } />
        <Route path="/courses" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Courses />
          </ProtectedRoute>
        } />
        <Route path="/attendance" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Attendance />
          </ProtectedRoute>
        } />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        } />
        <Route path="/teacher/attendance" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherAttendance />
          </ProtectedRoute>
        } />
        <Route path="/teacher/grades" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherGrades />
          </ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/grades" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/attendance" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/unauthorized" element={<div className="p-10 text-center text-red-500 text-2xl font-bold">Unauthorized Access</div>} />
      </Route>

      {/* Catch all - Redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
