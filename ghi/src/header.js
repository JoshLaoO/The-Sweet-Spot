import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeToken } from './features/token/tokenSlice';
function Header({ isLoggedIn, userType, userName }) {
    const token = useSelector((state) => state.token.token);
    const dispatch = useDispatch()
    const logout = async () => {
        const url = 'http://localhost:8000/token'
        const fetchConfig = {
            method: 'DELETE',
            headeres: {'Content-Type': 'application/json'},
            credentials: 'include'
        }
        const response = await fetch(url,fetchConfig);
        if(response.ok){
            const data = await response.json()
            console.log(data)
            dispatch(changeToken(''))
        }
    }
    return (
        <div className="header-container">
            <div className="header-title">Sweet-Spot</div>
            <div className="w-25 p-2">
                <i className="fa-solid fa-magnifying-glass m-1"></i>
                <input type="text" className="search-box" placeholder="Search for candies" />
            </div>
            <div className="nav-buttons">
                <Link to="/mainpage/" className="btn btn-info text-white m-2">Sweet Home</Link>



                {token.length > 0 ?
                    <>
                        <span>Hello, {userName}</span>
                        <button onClick={logout} className="btn btn-danger m-2">Log Out</button>
                        <Link to="/users" className="btn btn-info text-white m-2">Connect!</Link>
                    </> :
                    <>

                        <Link className="btn btn-info text-white m-2" to="/signup/" /*className="button-link"*/>Sign Up</Link>
                        <Link to="/login/" className="btn btn-info text-white m-2">Log In</Link>
                    </>
                }

                {isLoggedIn && userType === 'business' && (
                    <>
                        <span>Hello, {userName}</span>
                        <Link to="/profile/" className="btn btn-info text-white">Profile</Link>
                        <Link to="/orders/" className="btn btn-info text-white">Orders</Link>
                        <Link to="/transactions/" className="btn btn-info text-white">Transactions</Link>

                        <button  className="btn btn-danger m-2">Log Out</button>
                    </>
                )}
                <Link to="/create-candy" className="btn btn-info text-white m-2">Create Candy(This will not be here later)</Link>
                <Link to="/cart/" className="btn btn-info text-white">
                    <i className="fa fa-shopping-cart"></i> Cart
                </Link>


            </div>
        </div>
    );
}

export default Header;
