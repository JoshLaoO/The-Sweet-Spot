import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, userType, userName }) {
    return (
        <div className="header-container">
            <div className="header-title">Sweet-Spot</div>
            <input type="text" className="search-box" placeholder="Search for candies" />
            <div className="nav-buttons">
                <Link to="/mainpage/" className="btn btn-info text-white m-2">Sweet Home</Link>

                {!isLoggedIn && (
                    <>
                        <Link className="btn btn-info text-white m-2" to="/signup/" /*className="button-link"*/>Sign Up</Link>
                        <Link to="/login/" className="btn btn-info text-white m-2">Log In</Link>
                    </>
                )}

                {isLoggedIn && userType === 'user' && (
                    <>
                        <span>Hello, {userName}</span>
                        <Link to="/logout/" className="btn btn-danger m-2">Log Out</Link>
                    </>
                )}

                {isLoggedIn && userType === 'business' && (
                    <>
                        <span>Hello, {userName}</span>
                        <Link to="/profile/" className="btn btn-info text-white">Profile</Link>
                        <Link to="/orders/" className="btn btn-info text-white">Orders</Link>
                        <Link to="/transactions/" className="btn btn-info text-white">Transactions</Link>
                        <Link to="/logout/" className="btn btn-info text-white">Log Out</Link>
                    </>
                )}

                <Link to="/cart/" className="btn btn-info text-white">
                    <i className="fa fa-shopping-cart"></i> Cart
                </Link>
            </div>
        </div>
    );
}

export default Header;
