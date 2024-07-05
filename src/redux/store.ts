import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import signedInUserReducer from "./actUserslice"
export const store = configureStore({
    reducer : {
        userReducer : userReducer,
        signedInUserReducer : signedInUserReducer
    },
})
export type IRootState = ReturnType<typeof store.getState>