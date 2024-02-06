import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import cartReducer from '../features/cart/cartSlice';
import candiesReducer from "../candiesReducer";



export const store = configureStore({
    reducer: {
        token: tokenReducer,
        cart: cartReducer,
        candies: candiesReducer,
    }
})
