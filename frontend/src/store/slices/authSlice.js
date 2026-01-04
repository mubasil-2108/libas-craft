import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const initialState = {
    user: null,
    isAuthLoading: false,
    isLoggedIn: false,
    isSuccess: false,
    error: null,
    initialized: false, // ✅ ADD THIS
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData, thunkAPI) => {
        try {
            const result = await axios.post(`${API_URL}/register`,
                formData,
                { withCredentials: true }
            );
            if (result.status !== 201) {
                throw new Error('Failed to register user');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, thunkAPI) => {
        try {
            const result = await axios.post(`${API_URL}/login`, formData,
                { withCredentials: true }
            );
            if (result.status !== 200) {
                throw new Error('Failed to login user');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            const result = await axios.get(`${API_URL}/logout`,
                { withCredentials: true }
            );
            if (result.status !== 200) {
                throw new Error('Failed to logout user');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, thunkAPI) => {
        try {
            const result = await axios.get(`${API_URL}/getuser`,
                { withCredentials: true }
            );
            if (result.status !== 200) {
                throw new Error('Failed to get user');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const loginStatus = createAsyncThunk(
    'auth/loginStatus',
    async (_, thunkAPI) => {
        try {
            const result = await axios.get(`${API_URL}/loggedin`,
                { withCredentials: true }
            );
            if (result.status !== 200) {
                throw new Error('Failed to get login status');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (formData, thunkAPI) => {
        try {
            const result = await axios.patch(`${API_URL}/updateuser`, formData,
                { withCredentials: true }
            );
            if (result.status !== 200) {
                throw new Error('Failed to update user');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (passwordData, thunkAPI) => {
        try {
            const result = await axios.patch(`${API_URL}/changepassword`, passwordData,
                { withCredentials: true }
            );
            if (result.status !== 200) {
                throw new Error('Failed to change password');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const forgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async (email, thunkAPI) => {
        try {
            const result = await axios.post(`${API_URL}/forgotpassword`,
                { email },
                { withCredentials: true }
            );
            if (result.status !== 200) {
                throw new Error('Failed to forget password');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ resetToken, password }, thunkAPI) => {
        try {
            const result = await axios.put(`${API_URL}/resetpassword/${resetToken}`, { password },
                { withCredentials: true }
            );
            if (result.status !== 200) {
                throw new Error('Failed to reset password');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        RESET_AUTH(state) {
            state.isAuthLoading = false;
            state.isSuccess = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // ================= REGISTER =================
            .addCase(registerUser.pending, (state) => {
                state.isAuthLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.isLoggedIn = true;
                state.initialized = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isAuthLoading = false;
                state.error = action.payload;
                state.initialized = true;
            })

            // ================= LOGIN =================
            .addCase(loginUser.pending, (state) => {
                state.isAuthLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.isLoggedIn = true;
                state.initialized = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthLoading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
                state.initialized = true;
            })

            // ================= LOGOUT =================
            .addCase(logoutUser.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthLoading = false;
                state.user = null;
                state.isLoggedIn = false;
                state.isSuccess = true;
                state.initialized = true;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isAuthLoading = false;
                state.error = action.payload;
                state.initialized = true;
            })

            // ================= GET USER =================
            .addCase(getUser.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isAuthLoading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
                state.initialized = true;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isAuthLoading = false;
                state.error = action.payload;
                state.user = null;
                state.isLoggedIn = false;
                state.initialized = true;
            })

            // ================= LOGIN STATUS =================
            .addCase(loginStatus.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload;
                state.initialized = true;
            })
            .addCase(loginStatus.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.initialized = true; // ✅ add this
            })


            // ================= UPDATE USER =================
            .addCase(updateUser.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isAuthLoading = false;
                state.user = action.payload;
                state.isSuccess = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isAuthLoading = false;
                state.error = action.payload;
            })

            // ================= CHANGE PASSWORD =================
            .addCase(changePassword.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isAuthLoading = false;
                state.isSuccess = true;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isAuthLoading = false;
                state.error = action.payload;
            })

            // ================= FORGOT PASSWORD =================
            .addCase(forgetPassword.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(forgetPassword.fulfilled, (state) => {
                state.isAuthLoading = false;
                state.isSuccess = true;
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.isAuthLoading = false;
                state.error = action.payload;
            })

            // ================= RESET PASSWORD =================
            .addCase(resetPassword.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isAuthLoading = false;
                state.isSuccess = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isAuthLoading = false;
                state.error = action.payload;
            });
    },
})

export const { RESET_AUTH } = authSlice.actions;
export default authSlice.reducer;