import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/packages";

const initialState = {
    packages: [],
    isPackageLoading: false,
    selectedPackage: null,
    error: null,
};

// CREATE PACKAGE

export const createPackage = createAsyncThunk(
    "package/create-package",
    async (formData, thunkAPI) => {
        try {
            const res = await axios.post(`${API_URL}/create-package`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.status !== 201) {
                throw new Error('Failed to add product');
            }
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

// GET ALL PACKAGES

export const getAllPackages = createAsyncThunk(
    "package/get-all-packages",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${API_URL}/all-packages`);
            return res.data.packages;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

// GET SINGLE PACKAGE

export const getSinglePackage = createAsyncThunk(
    "package/get-single-package",
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`${API_URL}/single-package/${id}`);
            return res.data.package;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

// UPDATE PACKAGE

export const updatePackage = createAsyncThunk(
    "package/update-package",
    async ({ id, formData }, thunkAPI) => {
        try {
            const res = await axios.put(`${API_URL}/update-package/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.status !== 200) {
                throw new Error('Failed to update product');
            }
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

// DELETE PACKAGE IMAGE

export const deletePackageImage = createAsyncThunk(
    "package/delete-package-image",
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${API_URL}/delete-package-image/${id}`);
            if (res.status !== 200) {
                throw new Error('Failed to delete product image');
            }
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

// SET MAIN PACKAGE

export const setMainPackage = createAsyncThunk(
    'package/set-main-package',
    async (id, thunkAPI) => {
        try {
            const result = await axios.put(
                `http://localhost:5000/api/packages/main-package/${id}`
            );

            if (result.status !== 200) {
                throw new Error('Failed to set main package');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// DELETE PACKAGE

export const deletePackage = createAsyncThunk(
    "package/delete-package",
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${API_URL}/delete-package/${id}`);
            if (res.status !== 200) {
                throw new Error('Failed to delete product');
            }
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

const packageSlice = createSlice({
    name: "packages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // FETCH ALL
            .addCase(getAllPackages.pending, (state) => {
                state.isPackageLoading = true;
            })
            .addCase(getAllPackages.fulfilled, (state, action) => {
                state.isPackageLoading = false;
                state.packages = action.payload;
            })
            .addCase(getAllPackages.rejected, (state, action) => {
                state.isPackageLoading = false;
                state.error = action.payload;
            })

            // FETCH ONE
            .addCase(getSinglePackage.pending, (state) => {
                state.isPackageLoading = true;
            })
            .addCase(getSinglePackage.fulfilled, (state, action) => {
                state.isPackageLoading = false;
                state.selectedPackage = action.payload;
            })
            .addCase(getSinglePackage.rejected, (state, action) => {
                state.isPackageLoading = false;
                state.error = action.payload;
            })

            // CREATE
            .addCase(createPackage.pending, (state) => {
                state.isPackageLoading = true;
            })
            .addCase(createPackage.fulfilled, (state, action) => {
                state.isPackageLoading = false;
                state.packages.push(action.payload);
            })
            .addCase(createPackage.rejected, (state, action) => {
                state.isPackageLoading = false;
                state.error = action.payload;
            })

            // UPDATE
            .addCase(updatePackage.pending, (state) => {
                state.isPackageLoading = true;
            })
            .addCase(updatePackage.fulfilled, (state, action) => {
                state.isPackageLoading = false;
                state.selectedPackage = action.payload.data;
            })
            .addCase(updatePackage.rejected, (state, action) => {
                state.isPackageLoading = false;
                state.error = action.payload;
            })

            // SET MAIN
            .addCase(setMainPackage.pending, (state) => {
                state.isPackageLoading = true;
                state.error = null;
            })
            .addCase(setMainPackage.fulfilled, (state, action) => {
                state.isPackageLoading = false;

                const updatedPackage = action.payload.package; // ✔ use payload directly

                state.packages = state.packages.map(pkg => ({
                    ...pkg,
                    mainPackage: pkg._id === updatedPackage._id
                }));

                if (state.selectedPackage && state.selectedPackage._id === updatedPackage._id) {
                    state.selectedPackage = updatedPackage;
                }

                state.successMessage = `${updatedPackage.packageName} is now the main package`;
            })
            .addCase(setMainPackage.rejected, (state, action) => {
                state.isPackageLoading = false;
                state.error = action.payload?.message || "Something went wrong";
            })

            // DELETE IMAGE
            .addCase(deletePackageImage.pending, (state) => {
                state.isPackageLoading = true;
            })
            .addCase(deletePackageImage.fulfilled, (state, action) => {
                state.isPackageLoading = false;
                state.selectedPackage = action.payload;
            })
            .addCase(deletePackageImage.rejected, (state, action) => {
                state.isPackageLoading = false;
                state.error = action.payload;
            })

            // DELETE
            .addCase(deletePackage.pending, (state) => {
                state.isPackageLoading = true;
            })
            .addCase(deletePackage.fulfilled, (state, action) => {
                state.isPackageLoading = false;
                state.packages = state.packages.filter(
                    (pkg) => pkg._id !== action.payload
                );
            })
            .addCase(deletePackage.rejected, (state, action) => {
                state.isPackageLoading = false;
                state.error = action.payload;
            });

    }
})

export default packageSlice.reducer