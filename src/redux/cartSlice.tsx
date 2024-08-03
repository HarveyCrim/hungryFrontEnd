import { createSlice } from "@reduxjs/toolkit";
type product = {
    name: string,
    quantity: number,
    price: number,
    id: string,
}

type state = {
    total: number,
    products: product[],
    resId: string
}

let startSate: state = {
    total: 0,
    products: [],
    resId:""
}
const cartSlice = createSlice({
    name: "cart",
    initialState: startSate as state,
    reducers: {
        addTocart : (state, action) => {
            for(let i = 0; i < state.products.length; i++){
                if(state.products[i].name === action.payload.name){
                    state.products[i].quantity++
                    state.total += action.payload.price
                    return
                }
            }
            if(state.resId === "" || state.resId !== action.payload.id){
                state.resId = action.payload.id
                state.total = 0
                state.products = []
            }
            state.total += action.payload.price
            state.products.push({name: action.payload.name, quantity: 1, price: action.payload.price, id: action.payload.id})
        },
        deleteFromCart: (state, action) => {
            for(let i = 0; i < state.products.length; i++){
                if(state.products[i].name === action.payload.name){
                    state.total -= (state.products[i].price * state.products[i].quantity)
                    state.products.splice(i, 1)
                }
            }
            if(state.products.length == 0){
                state.resId = ""
                state.total = 0
            }
        },
        removeFromCart: (state, action) => {
            let found = false
            for(let i = 0; i < state.products.length; i++){
                if(state.products[i].name === action.payload.name){
                    found = true
                    state.products[i].quantity--
                    if(state.products[i].quantity === 0){
                        state.products.splice(i, 1)
                    }
                }
            }
            if(!found)
                return
            state.total -= action.payload.price
            if(state.products.length == 0){
                state.total = 0
                state.resId = ""
            }
        }
    }
})

export default cartSlice.reducer
export const {addTocart, removeFromCart, deleteFromCart} = cartSlice.actions