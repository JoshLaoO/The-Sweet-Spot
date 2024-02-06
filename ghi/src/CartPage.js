import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from './features/cart/cartSlice';
import './assets/shoppingCart.css';
import { Link } from 'react-router-dom';

const SALES_TAX_RATE = 0.08;

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items) || {};
    const candies = useSelector(state => state.candies.candies) || [];

    const handleUpdateQuantity = (candyId, newQuantity) => {
        if (newQuantity >= 0) {
            dispatch(updateQuantity({ candyId, quantity: newQuantity }));
        }
    };

    const handleRemove = (candyId) => {
        dispatch(removeFromCart({ candyId }));
    };

    const subtotal = Object.entries(cartItems).reduce((total, [candyId, quantity]) => {
        const candy = candies.find(c => c.id === parseInt(candyId, 10));
        return candy ? total + (candy.price * quantity) : total;
    }, 0);

    const tax = subtotal * SALES_TAX_RATE;
    const totalPrice = subtotal + tax;

    return (
        <div className="shoppingCartWarp">
            <div className="shoppingCartWarp_header">
                <h2>Your Shopping Cart</h2>
            </div>
            <div className="shoppingCartWarp_content">
                {Object.entries(cartItems).length === 0 ? (
                    <p>No Candy yet</p>
                ) : (
                    Object.entries(cartItems).map(([candyId, quantity]) => {
                        const candy = candies.find(c => c.id === parseInt(candyId, 10));
                        const itemTotal = candy ? candy.price * quantity : 0;
                        return candy ? (
                            <div key={candyId} className="shoppingCartWarp_content_list">
                                <div className="shoppingCartWarp_content_list_imgWarp">
                                    <img src={candy.picture_url} alt={candy.name} />
                                </div>
                                <div className="shoppingCartWarp_content_list_info">
                                    <div className="shoppingCartWarp_content_list_title">
                                        <Link to={`/candy/${candyId}`}>{candy.name}</Link>
                                    </div>
                                    <div className="shoppingCartWarp_content_list_subtitle">{candy.description}</div>
                                    <div className="shoppingCartWarp_content_list_action">
                                        <div className="shoppingCartWarp_content_list_price">${candy.price.toFixed(2)}</div>
                                        <div className="shoppingCartWarp_content_list_actionNum">
                                            <div className="shoppingCartWarp_content_list_actionNumChangeButton" onClick={() => handleUpdateQuantity(candyId, quantity - 1)}>-</div>
                                            <div className="shoppingCartWarp_content_list_actionNumInfo">{quantity}</div>
                                            <div className="shoppingCartWarp_content_list_actionNumChangeButton" onClick={() => handleUpdateQuantity(candyId, quantity + 1)}>+</div>
                                        </div>
                                        <div className="item-total-price">${itemTotal.toFixed(2)}</div>
                                        <button onClick={() => handleRemove(candyId)} className="remove-button">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ) : null;
                    })
                )}
                <div className="shoppingCartWarp_footer">
                    <div className="shoppingCartWarp_footer_mount">Subtotal: ${subtotal.toFixed(2)}</div>
                    <div className="shoppingCartWarp_footer_mount">Tax: ${tax.toFixed(2)}</div>
                    <div className="shoppingCartWarp_footer_mount">Total Price: ${totalPrice.toFixed(2)}</div>
                    <div className="shoppingCartWarp_footer_submit">Checkout</div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
