import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    const [candies, setCandies] = useState([]);
    const [featuredCandy, setFeaturedCandy] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/candy')
            .then(response => response.json())
            .then(data => {
                setCandies(data);
                if (data.length > 0) {

                    setFeaturedCandy(data[Math.floor(Math.random() * data.length)]);
                }
            });
    }, []);

    return (
        <div>
            {featuredCandy && (
                <div>
                    <img src={featuredCandy.image} alt={featuredCandy.name} />
                    <h2>{featuredCandy.name}</h2>

                </div>
            )}
            <div>
                {candies.map(candy => (
                    <div key={candy.id}>
                        <img src={candy.image} alt={candy.name} />
                        <h3><Link to={`/candy/${candy.id}`}>{candy.name}</Link></h3>
                        <button onClick={() => addToCart(candy.id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function addToCart(candyId) {

    console.log(`Add candy ${candyId} to cart`);
}

export default MainPage;
