import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    const [candies, setCandies] = useState([]);
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {

        fetch('http://localhost:8000/candy')
            .then(response => response.json())
            .then(data => setCandies(data))
            .catch(error => console.error('Fetch error:', error));


        fetch('http://localhost:8000/businesses')
            .then(response => response.json())
            .then(data => setBusinesses(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const image = "ghi/src/images/background.png";

    function addToCart(candyId) {
        console.log(`Candy ${candyId} will be added to cart in the future.`);
    }

    return (
        <div>

            <div className="featured-candy">
                <img src={image} alt="Placeholder" />
            </div>

            <div><h2 className="centered-heading">All the Candies</h2></div>
            <div className="product-container">
                {candies.length > 0 ? candies.map(candy => (
                    <div key={candy.id} className="product-item">
                        <img src={candy.picture_url} alt={candy.name} />
                        <h3><Link to={`/candy/${candy.id}`}>{candy.name}</Link></h3>
                        <input
                            type="number"
                            min="1"
                            defaultValue="1"
                            id={`quantity_${candy.id}`}
                        />
                        <button
                            onClick={() => addToCart(candy.id, document.getElementById(`quantity_${candy.id}`).value)}
                        >
                            Add to Cart
                        </button>
                    </div>
                )) : <p>Loading candies...</p>}
            </div>




            <div><h2 className="centered-heading">All the Candy Brands</h2></div>
            <div className="product-container">
                {businesses.length > 0 ? businesses.map(business => (
                    <div key={business.business_id} className="product-item">
                        <img src={business.picture_url} alt={business.business_name} />
                        <h3><Link to={`/business/${business.business_id}`}>{business.business_name}</Link></h3>
                    </div>
                )) : <p>Loading businesses...</p>}
            </div>

        </div>
    );
}

export default MainPage;
