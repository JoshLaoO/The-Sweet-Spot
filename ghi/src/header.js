import React from 'react';
import './App.css';

function Header() {
    return (
        <div className="header-container">
            <div className="header-title">Sweet-Spot</div>
            <input type="text" className="search-box" placeholder="Search for candies" />
            <div className="auth-buttons">
                <button type="button">Sign Up</button>
                <button type="button">Log In</button>
            </div>
        </div>
    );
}

export default Header;
