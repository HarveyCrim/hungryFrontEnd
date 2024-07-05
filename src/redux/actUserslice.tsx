import { createSlice } from "@reduxjs/toolkit";

const actuserslice = createSlice({
    name: "actuserslice",
    initialState : {
        signedInUser : null
    },
    reducers : {
        setUser: (state, action) => {
            state.signedInUser = action.payload
        }
    }
})

export const {setUser} = actuserslice.actions
export default actuserslice.reducer