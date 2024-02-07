import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from './features/cart/cartSlice';

const CartItem = ({ candy, quantity }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeFromCart({ candyId: candy.id }));
    };

    return (
        <div className="cart-item">
            <img src={candy.picture_url} alt={candy.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h4>{candy.name}</h4>
                <p>price: ${candy.price.toFixed(2)}</p>
                <p>quantity: {quantity}</p>
                <button onClick={handleRemove}>remove</button>
            </div>
        </div>
    );
};

export default CartItem;
