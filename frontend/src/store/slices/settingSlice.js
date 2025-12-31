import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: null,
    loading: false,
    error: null,
    success: false,
};

const API_URL = "http://localhost:5000/api/settings";

/* =========================
   FETCH SETTINGS
========================= */
export const fetchSettings = createAsyncThunk(
    "setting/fetchSettings",
    async (_, thunkAPI) => {
        try {
            const result = await axios.get(API_URL);
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* =========================
   UPSERT FULL SETTINGS
========================= */
export const upsertSettings = createAsyncThunk(
    "setting/upsertSettings",
    async (data, thunkAPI) => {
        try {
            const result = await axios.post(API_URL, data);
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* =========================
   UPDATE SITE SETTINGS
   (logo + site fields)
========================= */
export const updateSiteSettings = createAsyncThunk(
    "setting/updateSiteSettings",
    async (formData, thunkAPI) => {
        console.log(formData, "formData in updateSiteSettings");
        try {
            const result = await axios.patch(
                `${API_URL}/site-settings`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* =========================
   UPDATE DEAL MODAL
========================= */
export const updateDealModal = createAsyncThunk(
    "setting/updateDealModal",
    async (formData, thunkAPI) => {
        try {
            const result = await axios.patch(
                `${API_URL}/deal-modal`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* =========================
   UPDATE SOCIAL LINKS
========================= */
export const updateSocialLinks = createAsyncThunk(
    "setting/updateSocialLinks",
    async (formData, thunkAPI) => {
        try {
            const result = await axios.patch(
                `${API_URL}/social-links`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* =========================
   UPDATE NOTE
========================= */
export const updateNote = createAsyncThunk(
    "setting/updateNote",
    async (note, thunkAPI) => {
        try {
            const result = await axios.patch(
                `${API_URL}/note`,
                { note } // ✅ correct shape
            );
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        clearSettingsState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder

            /* -------- FETCH -------- */
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* -------- COMMON SUCCESS -------- */
            .addMatcher(
                (action) =>
                    action.type.startsWith("setting/") &&
                    action.type.endsWith("/fulfilled"),
                (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.data = action.payload.data;
                }
            )

            /* -------- COMMON ERROR -------- */
            .addMatcher(
                (action) =>
                    action.type.startsWith("setting/") &&
                    action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            /* -------- COMMON LOADING -------- */
            .addMatcher(
                (action) =>
                    action.type.startsWith("setting/") &&
                    action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = false;
                }
            );
    },
});

export const { clearSettingsState } = settingSlice.actions;
export default settingSlice.reducer;
