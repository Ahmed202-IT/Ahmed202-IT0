import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/attendance';

export const fetchAttendance = createAsyncThunk('attendance/fetchAttendance', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const markAttendance = createAsyncThunk('attendance/markAttendance', async (record) => {
    const response = await axios.post(API_URL, record);
    return response.data;
});

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchAttendance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(markAttendance.fulfilled, (state, action) => {
                state.list.push(action.payload);
            });
    },
});

export default attendanceSlice.reducer;
