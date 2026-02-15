import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/grades';

export const fetchGrades = createAsyncThunk('grades/fetchGrades', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addGrade = createAsyncThunk('grades/addGrade', async (grade) => {
    const response = await axios.post(API_URL, grade);
    return response.data;
});

export const updateGrade = createAsyncThunk('grades/updateGrade', async (grade) => {
    const { id } = grade;
    const response = await axios.put(`${API_URL}/${id}`, grade);
    return response.data;
});

export const deleteGrade = createAsyncThunk('grades/deleteGrade', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const gradesSlice = createSlice({
    name: 'grades',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGrades.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGrades.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchGrades.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addGrade.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateGrade.fulfilled, (state, action) => {
                const index = state.list.findIndex((g) => g.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteGrade.fulfilled, (state, action) => {
                state.list = state.list.filter((g) => g.id !== action.payload);
            });
    },
});

export default gradesSlice.reducer;
