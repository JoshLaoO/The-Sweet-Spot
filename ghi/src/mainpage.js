import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    const [candies, setCandies] = useState([]);
    const [featuredCandy, setFeaturedCandy] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态

    useEffect(() => {
        fetch('http://localhost:8000/candy')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCandies(data);
                if (data.length > 0) {
                    setFeaturedCandy(data[Math.floor(Math.random() * data.length)]);
                }
                setIsLoading(false); // 数据加载完成，更新加载状态
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setIsLoading(false); // 出错时也更新加载状态
            });
    }, []);

    const placeholderImage = "https://via.placeholder.com/1500x500";

    if (isLoading) {
        return <p>Loading candies...</p>; // 显示加载信息
    }

    return (
        <div>
            <div>
                <img src={featuredCandy ? featuredCandy.image : placeholderImage} alt={featuredCandy ? featuredCandy.name : "Placeholder"} />
                {featuredCandy && <h2>{featuredCandy.name}</h2>}
            </div>
            <div className="product-container">
                {candies.length > 0 ? (
                    candies.map(candy => (
                        <div key={candy.id} className="product-item">
                            <img src={candy.image || placeholderImage} alt={candy.name} />
                            <h3><Link to={`/candy/${candy.id}`}>{candy.name}</Link></h3>
                            <button onClick={() => addToCart(candy.id)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No candies available.</p> // 当没有糖果数据时显示
                )}
            </div>
        </div>
    );
}

function addToCart(candyId) {
    console.log(`Candy ${candyId} will be added to cart in the future.`);
}

export default MainPage;
