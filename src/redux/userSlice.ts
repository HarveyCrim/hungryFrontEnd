import { createSlice } from "@reduxjs/toolkit";
type state = {
    appDrawer : boolean,
        userMenu : boolean,
        reloadOrders : boolean
}
const initialState: state = {
    appDrawer : false,
        userMenu : false,
        reloadOrders : false
}
const userSlice = createSlice({
    name : "userSlice",
    initialState,
    reducers : {
        setAppDrawer : (state, action) => {
            state.appDrawer = action.payload
        },
        setUserMenu : (state, action) => {
            state.userMenu = action.payload
        },
        reloadTheOrders : (state) => {
            state.reloadOrders = !state.reloadOrders
        }
    }
})
export const {setAppDrawer, setUserMenu, reloadTheOrders} = userSlice.actions
export default userSlice.reducer