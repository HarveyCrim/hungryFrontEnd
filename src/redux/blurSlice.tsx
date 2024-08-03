import { createSlice } from "@reduxjs/toolkit";

const blurSlice = createSlice({
    name: "blurSlice",
    initialState: {
        blur: false
    },
    reducers: {
        switchBlur: (state, action) => {
            state.blur = action.payload
        }
    }
})

export default blurSlice.reducer
export const {switchBlur} = blurSlice.actions