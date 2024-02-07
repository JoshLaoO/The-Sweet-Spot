import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import idReducer from "../features/users/userIdSlice";
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from "../features/users/usersApi";
import usernameReducer from "../features/users/usernameSlice";
export const store = configureStore({
    reducer: {
        token: tokenReducer,
        id: idReducer,
        username: usernameReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)
