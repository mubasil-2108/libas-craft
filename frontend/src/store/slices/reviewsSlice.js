import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    list: [],
    productReviews: [],
    selectedReview: null,
    isLoading: false,
    error: null,
};

export const createReview = createAsyncThunk(
    'reviews/createReview',
    async (formData, thunkAPI) => {
        try {
            const result = await axios.post('http://localhost:5000/api/reviews/create-review',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (result.status !== 201) {
                throw new Error('Failed to create review');
            }
            return result.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchAllReviews = createAsyncThunk(
    'reviews/fetchAllReviews',
    async (_, thunkAPI) => {
        try {
            const result = await axios.get('http://localhost:5000/api/reviews/all-reviews');
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchReviewsByProduct = createAsyncThunk(
    'reviews/fetchReviewsByProduct',
    async (productId, thunkAPI) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`);
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchReviewById = createAsyncThunk(
    'reviews/fetchReviewById',
    async (reviewId, thunkAPI) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/reviews/${reviewId}`);
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (reviewId, thunkAPI) => {
        try {
            const result = await axios.delete(`http://localhost:5000/api/reviews/delete/${reviewId}`);
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        resetReviewsState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list.push(action.payload);
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch all reviews
            .addCase(fetchAllReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchAllReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch reviews by product
            .addCase(fetchReviewsByProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productReviews = action.payload;
            })
            .addCase(fetchReviewsByProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch review by ID
            .addCase(fetchReviewById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReviewById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedReview = action.payload;
            })
            .addCase(fetchReviewById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete review
            .addCase(deleteReview.fulfilled, (state, action) => {
                // state.list = state.list.filter(review => review._id !== action.meta.arg);
                state.list = state.list.filter((rev) => rev._id !== action.payload);
            })
    }
});

export const { resetReviewsState } = reviewsSlice.actions;
export default reviewsSlice.reducer;