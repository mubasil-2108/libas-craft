import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartItems: [],
    isLoading: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);

            if (existingItem) {
                // Add the quantity selected by user
                existingItem.quantity += newItem.quantity;
            } else {
                // Add product with the correct quantity
                state.cartItems.push({ ...newItem, quantity: newItem.quantity });
            }
        },
        increment: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrement: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity > 0 ? quantity : 1;
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, increment, decrement, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;