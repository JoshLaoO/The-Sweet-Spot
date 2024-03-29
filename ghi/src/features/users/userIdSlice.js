import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: ''
 }

const idSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        getId: (state, action) => {
            state.id = state
        }
    },
})

export const { getId } = idSlice.actions
export default idSlice.reducer
