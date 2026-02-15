import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/courses';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addCourse = createAsyncThunk('courses/addCourse', async (course) => {
    const response = await axios.post(API_URL, course);
    return response.data;
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.list = state.list.filter((course) => course.id !== action.payload);
            });
    },
});

export default coursesSlice.reducer;
