import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/blogs";

const initialState = {
    blogs: [],
    blog: null,

    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,

    error: null,

    page: 1,
    pages: 1,
    total: 0,
};


// ================= CREATE BLOG =================
export const createBlog = createAsyncThunk(
    "blog/createBlog",
    async (formData, { rejectWithValue }) => {
        console.log("FormData in thunk:", formData);
        try {
            const response = await axios.post(`${BASE_URL}/create-blog`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to create blog");
        }
    }
)

// ================= GET BLOGS =================

export const getBlogs = createAsyncThunk(
    "blog/getBlogs",
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/all-blogs?page=${page}&limit=${limit}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch blogs");
        }
    }
)

// ================= GET BLOGS =================

export const getBlogById = createAsyncThunk(
    "blog/getBlogById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/single-blog/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch blog");
        }
    }
)

// ================= GET SINGLE BLOG =================

export const updateBlog = createAsyncThunk(
    "blog/updateBlog",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/update-blog/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to update blog");
        }
    }
)

// ================= DELETE BLOG =================

export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete-blog/${id}`);
            return { ...response.data, id }; // return id along with response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete blog");
        }
    }
)
const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        clearBlogState: (state) => {
            state.error = null;
            state.blog = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // ===== CREATE =====
            .addCase(createBlog.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.createLoading = false;
                // state.blogs.unshift(action.payload.data);
                state.blogs = [action.payload.data, ...state.blogs];
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.createLoading = false;
                state.error = action.payload;
            })
            // ===== GET ALL =====
            .addCase(getBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload.data;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
                state.total = action.payload.total;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ===== GET ONE =====
            .addCase(getBlogById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBlogById.fulfilled, (state, action) => {
                state.loading = false;
                state.blog = action.payload.data;
            })
            .addCase(getBlogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===== UPDATE =====
            .addCase(updateBlog.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.blog = action.payload.data;

                state.blogs = state.blogs.map((b) =>
                    b._id === action.payload.data._id ? action.payload.data : b
                );
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })

            // ===== DELETE =====
            .addCase(deleteBlog.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.blogs = state.blogs.filter((b) => b._id !== action.payload.id);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            });
    }
})

export const { clearBlogState } = blogSlice.actions;
export default blogSlice.reducer;