import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.items) || {};
    const candies = useSelector(state => state.candies.candies) || [];


    const totalPrice = Object.entries(cartItems).reduce((total, [candyId, quantity]) => {
        const candy = candies.find(c => c.id === parseInt(candyId, 10));
        return candy ? total + (candy.price * quantity) : total;
    }, 0);

    return (
        <div className="cart-page">
            <h2>Your Shopping Cart</h2>
            {Object.entries(cartItems).length === 0 ? (
                <p>No Candy yet</p>
            ) : (
                <div className="cart-items">
                    {Object.entries(cartItems).map(([candyId, quantity]) => {
                        const candy = candies.find(c => c.id === parseInt(candyId, 10));
                        return candy ? (
                            <CartItem key={candyId} candy={candy} quantity={quantity} />
                        ) : null;
                    })}
                </div>
            )}
            <div className="cart-total">
                <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default CartPage;
