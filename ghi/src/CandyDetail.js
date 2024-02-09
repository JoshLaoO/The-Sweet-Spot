import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './features/cart/cartSlice';
import './assets/shoppingCart.css';

const CandyDetail = () => {
    const [candy, setCandy] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const { id } = useParams();
    const candyId = parseInt(id, 10);

    useEffect(() => {
        if (!isNaN(candyId)) {
            fetch(`${process.env.REACT_APP_API_HOST}/candy?candy_id=${candyId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const matchedCandy = Array.isArray(data) ? data.find(c => c.id === candyId) : null;
                    if (matchedCandy) {
                        setCandy(matchedCandy);
                    } else {
                        setError('Candy not found');
                    }
                })
                .catch(error => {
                    setError(error.message);
                });
        } else {
            setError('Invalid ID');
        }
    }, [candyId]);

    const handleAddToCart = () => {
        if (candy) {
            dispatch(addToCart({ candyId: candy.id, quantity }));
        }
    };

    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!candy) {
        return <div>Loading...</div>;
    }

    return (
        <div className="candy-detail-container">
            <div className="candy-image">
                <img src={candy.picture_url} alt={candy.name} />
            </div>
            <div className="candy-info">
                <h2>{candy.name}</h2>
                <p>{candy.description}</p>
                <p className="price">Price: ${candy.price}</p>
                <p className={candy.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                    {candy.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
                <div className="quantity-controls">
                    <button className="shoppingCartWarp_content_list_actionNumChangeButton" onClick={() => handleQuantityChange(-1)}>-</button>
                    <span>{quantity}</span>
                    <button className="shoppingCartWarp_content_list_actionNumChangeButton" onClick={() => handleQuantityChange(1)}>+</button>
                </div>
                <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    );
};

export default CandyDetail;
