import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import idReducer from "../features/users/userIdSlice";
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from "../features/users/usersApi";
import cartReducer from '../features/cart/cartSlice';
import candiesReducer from "../candiesReducer";



export const store = configureStore({
    reducer: {
        token: tokenReducer,
        cart: cartReducer,
        candies: candiesReducer,
        id: idReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)
