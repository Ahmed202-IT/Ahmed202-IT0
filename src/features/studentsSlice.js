import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    const response = await axios.get(`${API_URL}?role=student`);
    return response.data;
});

export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
    const studentWithRole = { ...student, role: 'student' };
    const response = await axios.post(API_URL, studentWithRole);
    return response.data;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async (student) => {
    const { id } = student;
    const response = await axios.put(`${API_URL}/${id}`, student);
    return response.data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                const index = state.list.findIndex((student) => student.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.list = state.list.filter((student) => student.id !== action.payload);
            });
    },
});

export default studentsSlice.reducer;
