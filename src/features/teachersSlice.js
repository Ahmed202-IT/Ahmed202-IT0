import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', async () => {
    const response = await axios.get(`${API_URL}?role=teacher`);
    return response.data;
});

export const addTeacher = createAsyncThunk('teachers/addTeacher', async (teacher) => {
    const teacherWithRole = { ...teacher, role: 'teacher' };
    const response = await axios.post(API_URL, teacherWithRole);
    return response.data;
});

export const updateTeacher = createAsyncThunk('teachers/updateTeacher', async (teacher) => {
    const { id } = teacher;
    const response = await axios.put(`${API_URL}/${id}`, teacher);
    return response.data;
});

export const deleteTeacher = createAsyncThunk('teachers/deleteTeacher', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const teachersSlice = createSlice({
    name: 'teachers',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTeacher.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateTeacher.fulfilled, (state, action) => {
                const index = state.list.findIndex((teacher) => teacher.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteTeacher.fulfilled, (state, action) => {
                state.list = state.list.filter((teacher) => teacher.id !== action.payload);
            });
    },
});

export default teachersSlice.reducer;
