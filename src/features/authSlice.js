import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}?email=${email}&password=${password}`);
        if (response.data.length > 0) {
            const user = response.data[0];
            // Store user in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } else {
            return rejectWithValue('Invalid email or password');
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
