import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: ''
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        changeToken: (state,action) => {
            state.token = action.payload
        }
    }
});
export const { changeToken } = tokenSlice.actions;
//export const selectToken = (state) => state.token.payload;
export default tokenSlice.reducer;