import {configureStore} from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import reviewsReducer from './slices/reviewsSlice';

const store = configureStore({
    reducer:{
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        reviews: reviewsReducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;