import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className="header-container">
            <div className="header-title">Sweet-Spot</div>
            <input type="text" className="search-box" placeholder="Search for candies" />
            <div className="auth-buttons">
                <Link to="/signup/" className="button-link">Sign Up</Link>
                <Link to="/login/" className="button-link">Log In</Link>

            </div>
        </div>
    );
}

export default Header;
