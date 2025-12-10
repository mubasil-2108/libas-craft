import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

const initialState = {
    orders: [],
    userOrders: [],
    dateRange: '',
    isLoading: false,
    error: null,
    success: false
};

// Create a new order
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (orderData, thunkAPI) => {
        console.log(orderData, "orderData in orderSlice");
        try {
            const response = await axios.post(`${API_URL}/create-order`, orderData);
            console.log(response.data, "response.data in orderSlice");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Get all orders (Admin)
export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/all-orders`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Get orders for a specific user
export const getUserOrders = createAsyncThunk(
    'order/getUserOrders',
    async (userId, thunkAPI) => {
        console.log(userId, "userId in OrderSlice");
        try {
            const response = await axios.get(`${API_URL}/user/${userId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
    'order/updateOrderStatus',
    async ({ orderId, status }, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/update-status/${orderId}`, { status });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (orderId, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${orderId}`);
            return { orderId, ...response.data }; // return orderId along with response data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrderState: (state) => {  // to reset state after order completion
            state.isLoading = false;
            state.error = null;
            state.success = false;
        },
        setOrderDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders.push(action.payload);
                state.success = true;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get All Orders
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload.orders;
                if (action.payload.orders.length > 0) {
                    // Extract earliest and latest order dates
                    const dates = action.payload.orders.map(order => new Date(order.createdAt));
                    console.log(dates, "dates in orderSlice");
                    const minDate = new Date(Math.min(...dates));
                    const maxDate = new Date(Math.max(...dates));

                    // Format dates nicely (Feb 16, 2022 style)
                    const options = { year: 'numeric', month: 'short', day: 'numeric' };
                    state.dateRange = `${minDate.toLocaleDateString(undefined, options)} - ${maxDate.toLocaleDateString(undefined, options)}`;
                    console.log(state.dateRange, "dateRange in orderSlice");
                } else {
                    state.dateRange = ''; // No orders
                }
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get User Orders
            .addCase(getUserOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userOrders = action.payload.orders;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update Order Status
            .addCase(updateOrderStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.orders.findIndex(o => o._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete Order
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = state.orders.filter(o => o._id !== action.payload.orderId);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }

});

export const { resetOrderState, setOrderDateRange } = orderSlice.actions;
export default orderSlice.reducer;