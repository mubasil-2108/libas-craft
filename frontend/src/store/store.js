import {configureStore} from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import reviewsReducer from './slices/reviewsSlice';
import likesReducer from './slices/likesSlice';

const store = configureStore({
    reducer:{
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        reviews: reviewsReducer,
        likes: likesReducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;