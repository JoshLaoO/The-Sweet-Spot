import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {} // 以 candyId 为 key，数量为 value
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { candyId, quantity } = action.payload;
            if (state.items[candyId]) {
                state.items[candyId] += quantity;
            } else {
                state.items[candyId] = quantity;
            }
        },
        removeFromCart: (state, action) => {
            delete state.items[action.payload.candyId];
        },
        updateQuantity: (state, action) => {
            const { candyId, quantity } = action.payload;
            if (state.items[candyId]) {
                state.items[candyId] = quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
