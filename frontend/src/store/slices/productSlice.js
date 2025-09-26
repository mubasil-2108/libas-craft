import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    selectedProduct: null,
    selectedCategory: null,
    isLoading: false,
};

export const addNewProduct = createAsyncThunk(
    'product/add-new-product',
    async (formData, thunkAPI) => {
        try {
            const result = await axios.post('http://localhost:5000/api/products/create-product',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // 👈 IMPORTANT
                    },
                }
            )
            if (result.status !== 201) {
                throw new Error('Failed to add product');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const getAllProducts = createAsyncThunk(
    'product/get-all-products',
    async (_, thunkAPI) => {
        try {
            const result = await axios.get('http://localhost:5000/api/products/all-products');
            if (result.status !== 200) {
                throw new Error('Failed to get products');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const getProductById = createAsyncThunk(
    'product/get-product-by-id',
    async (id, thunkAPI) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/products/single-product/${id}`);
            if (result.status !== 200) {
                throw new Error('Failed to get product');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const deleteProductImage = createAsyncThunk(
    'product/delete-product-image',
    async ({ productId, fileId }, thunkAPI) => {
        try {
            const result = await axios.delete(`http://localhost:5000/api/products/delete-product-image/${productId}`,
                { data: { fileId } }
            );
            if (result.status !== 200) {
                throw new Error('Failed to delete product image');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/update-product',
    async ({ id, formData }, thunkAPI) => {
        console.log('Form Data in Thunk:', formData);
        try {
            const result = await axios.put(`http://localhost:5000/api/products/update-product/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // 👈 IMPORTANT
                    },
                }
            );
            if (result.status !== 200) {
                throw new Error('Failed to update product');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/delete-product',
    async (id, thunkAPI) => {
        try {
            const result = await axios.delete(`http://localhost:5000/api/products/delete-product/${id}`);
            if (result.status !== 200) {
                throw new Error('Failed to delete product');
            }
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCategory: (state, action) =>{
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
            })
            .addCase(addNewProduct.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
            })
            .addCase(getAllProducts.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload.product;
            })
            .addCase(getProductById.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteProductImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductImage.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteProductImage.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload.product;
            })
            .addCase(updateProduct.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export const { setCategory } = productSlice.actions;
export default productSlice.reducer;