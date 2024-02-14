import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './features/cart/cartSlice';
import './assets/shoppingCart.css';
import candySaleImage from './images/candysale.png';



function MainPage() {
    const [candies, setCandies] = useState([]);
    const [candyQuantities, setCandyQuantities] = useState({});
    const [businesses, setBusinesses] = useState([]);
    const dispatch = useDispatch();

    const placeholderImage = "https://via.placeholder.com/1920x1080"; // 占位图片

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/candy`)
            .then(response => response.json())
            .then(data => {
                setCandies(data);
                const initialQuantities = data.reduce((acc, candy) => {
                    acc[candy.id] = 1;
                    return acc;
                }, {});
                setCandyQuantities(initialQuantities);
            })
            .catch(error => console.error(`Fetch error:`, error));

        fetch(`${process.env.REACT_APP_API_HOST}/businesses`)
            .then(response => response.json())
            .then(data => setBusinesses(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const handleQuantityChange = (candyId, change) => {
        setCandyQuantities(prevQuantities => ({
            ...prevQuantities,
            [candyId]: Math.max(1, (prevQuantities[candyId] || 1) + change)
        }));
    };

    const handleAddToCart = (candyId) => {
        const quantity = candyQuantities[candyId] || 1;
        dispatch(addToCart({ candyId, quantity }));
    };

    return (
        <div>
            <div className="featured-candy">
                <img className='w-100' src={candySaleImage} alt="Candy Sale" />
            </div>

            <div><h2 className="centered-heading">All the Candies</h2></div>
            <div className="product-container">
                {candies.length > 0 ? candies.map(candy => (
                    <div key={candy.id} className="product-item">
                        <img src={candy.picture_url || placeholderImage} alt={candy.name} />
                        <h3><Link to={`/candy/${candy.id}`}>{candy.name}</Link></h3>
                        <p>Price: ${candy.price}</p>
                        <div className="quantity-controls">
                            <button className="shoppingCartWarp_content_list_actionNumChangeButton" onClick={() => handleQuantityChange(candy.id, -1)}>-</button>
                            <span>{candyQuantities[candy.id]}</span>
                            <button className="shoppingCartWarp_content_list_actionNumChangeButton" onClick={() => handleQuantityChange(candy.id, 1)}>+</button>
                        </div>
                        <button onClick={() => handleAddToCart(candy.id)} className="add-to-cart-button">
                            Add To Cart
                        </button>
                    </div>
                )) : <p>Loading candies...</p>}
            </div>

            <div><h2 className="centered-heading">All the Candy Brands</h2></div>
            <div className="product-container">
                {businesses.length > 0 ? businesses.map(business => (
                    <div key={business.business_id} className="product-item">
                        <img src={business.picture_url || placeholderImage} alt={business.business_name} />
                        <h3><Link to={`/business/${business.business_id}`}>{business.business_name}</Link></h3>
                    </div>
                )) : <p>Loading businesses...</p>}
            </div>
        </div>
    );
}

export default MainPage;
