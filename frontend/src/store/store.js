import {configureStore} from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import reviewsReducer from './slices/reviewsSlice';
import likesReducer from './slices/likesSlice';
import packageReducer from './slices/packageSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        reviews: reviewsReducer,
        likes: likesReducer,
        packages: packageReducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;