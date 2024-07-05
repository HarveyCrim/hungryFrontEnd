import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "userSlice",
    initialState : {
        appDrawer : false,
        userMenu : false
    },
    reducers : {
        setAppDrawer : (state, action) => {
            state.appDrawer = action.payload
        },
        setUserMenu : (state, action) => {
            state.userMenu = action.payload
        }
    }
})
export const {setAppDrawer, setUserMenu} = userSlice.actions
export default userSlice.reducer