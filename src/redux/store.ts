import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import signedInUserReducer from "./actUserslice"
import cartReducer from "./cartSlice"
import blurReducer from "./blurSlice"
export const store = configureStore({
    reducer : {
        userReducer : userReducer,
        signedInUserReducer : signedInUserReducer,
        cartReducer: cartReducer,
        blurReducer: blurReducer
    },
})
export type IRootState = ReturnType<typeof store.getState>