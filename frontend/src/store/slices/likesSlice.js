import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/likes";

const initialState = {
    likesByProduct: {}, // { [productId]: likesCount }
    loading: false,
    error: null,
};

// Fetch likes count for a product
export const fetchLikes = createAsyncThunk(
    'likes/fetchLikes',
    async (productId, thunkAPI) => {
        try {
            const result = await axios.get(`${API_URL}/${productId}`);
            return { productId, likesCount: result.data.likesCount };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Add a like
export const addLike = createAsyncThunk(
    'likes/addLike',
    async (productId, thunkAPI) => {
        try {
            const result = await axios.post(`${API_URL}/${productId}`);
            return { productId, likesCount: result.data.likesCount };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Remove a like
export const removeLike = createAsyncThunk(
    'likes/removeLike',
    async (productId, thunkAPI) => {
        try {
            const result = await axios.delete(`${API_URL}/${productId}`);
            return { productId, likesCount: result.data.likesCount };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const likesSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchLikes
            .addCase(fetchLikes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLikes.fulfilled, (state, action) => {
                state.loading = false;
                state.likesByProduct[action.payload.productId] = action.payload.likesCount;
            })
            .addCase(fetchLikes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // addLike
            .addCase(addLike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLike.fulfilled, (state, action) => {
                state.loading = false;
                state.likesByProduct[action.payload.productId] =
                    action.payload.likesCount;
            })
            .addCase(addLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // removeLike
            .addCase(removeLike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeLike.fulfilled, (state, action) => {
                state.loading = false;
                state.likesByProduct[action.payload.productId] =
                    action.payload.likesCount;
            })
            .addCase(removeLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default likesSlice.reducer;