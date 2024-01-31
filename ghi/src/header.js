import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, userType, userName }) {
    return (
        <div className="header-container">
            <div className="header-title">Sweet-Spot</div>
            <input type="text" className="search-box" placeholder="Search for candies" />
            <div className="nav-buttons">
                <Link to="/mainpage/" className="button-link">Sweet Home</Link>

                {!isLoggedIn && (
                    <>
                        <Link to="/signup/" className="button-link">Sign Up</Link>
                        <Link to="/login/" className="button-link">Log In</Link>
                    </>
                )}

                {isLoggedIn && userType === 'user' && (
                    <>
                        <span>Hello, {userName}</span>
                        <Link to="/logout/" className="button-link">Log Out</Link>
                    </>
                )}

                {isLoggedIn && userType === 'business' && (
                    <>
                        <span>Hello, {userName}</span>
                        <Link to="/profile/" className="button-link">Profile</Link>
                        <Link to="/orders/" className="button-link">Orders</Link>
                        <Link to="/transactions/" className="button-link">Transactions</Link>
                        <Link to="/logout/" className="button-link">Log Out</Link>
                    </>
                )}

                <Link to="/cart/" className="button-link">
                    <i className="fa fa-shopping-cart"></i> Cart
                </Link>
            </div>
        </div>
    );
}

export default Header;
