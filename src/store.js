import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import studentsReducer from './features/studentsSlice';
import teachersReducer from './features/teachersSlice';
import attendanceReducer from './features/attendanceSlice';
import coursesReducer from './features/coursesSlice';
import gradesReducer from './features/gradesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        students: studentsReducer,
        teachers: teachersReducer,
        attendance: attendanceReducer,
        courses: coursesReducer,
        grades: gradesReducer,
    },
});
