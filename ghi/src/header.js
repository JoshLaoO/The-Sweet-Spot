import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header-container">
            <div className="header-title">Sweet-Spot</div>
            <input type="text" className="search-box" placeholder="Search for candies" />

            <div className="nav-buttons">

                <Link to="/mainpage/" className="button-link">Sweet Home</Link>


                <Link to="/signup/" className="button-link">Sign Up</Link>
                <Link to="/login/" className="button-link">Log In</Link>


                <Link to="/cart/" className="button-link">
                    <i className="fa fa-shopping-cart"></i> Cart
                </Link>
            </div>
        </div>
    );
}

export default Header;
