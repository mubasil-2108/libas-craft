import {configureStore} from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

const store = configureStore({
    reducer:{
        product: productReducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;