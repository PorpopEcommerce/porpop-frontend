import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import userReducer from './features/users/userSlice';
import subscriptionReducer from './features/subscription/subscriptionSlice';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    subscription: subscriptionReducer
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// For Thunks
export type TypedDispatch = ThunkDispatch<RootState, void, AnyAction>;