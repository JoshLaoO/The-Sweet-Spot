import { combineReducers } from 'redux';
import cartReducer from './features/cart/cartSlice';
import candiesReducer from './candiesReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    candies: candiesReducer
});

export default rootReducer;
