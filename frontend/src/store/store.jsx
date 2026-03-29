import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/reducers/authSlice"


export const store = configureStore({
    reducer: {
        auth: authSlice
    }
});