import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeToken } from './features/token/tokenSlice';
import { useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, userType, userName }) {
    const [username, setUsername] = useState()
    const [id, setId] = useState()
    const navigate = useNavigate()
    let userId = useParams()
    const token = useSelector((state) => state.token.token)
    const [business, setBusiness] = useState()
    const dispatch = useDispatch()
    const logout = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/token`
        const fetchConfig = {
            method: 'DELETE',
            headeres: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            dispatch(changeToken(''))
            navigate("/mainpage")
        }
    }

    const navigateToMyPage = async () => {
        const fetchUrl = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const res = await fetchUrl.json()
        userId = res.account.id
        console.log("DATA", res)
        setBusiness(res.account.business.business_name)
        setId(userId)
        setUsername(res.account.username)
    }

    useEffect(() => {
        navigateToMyPage();
    }, []);

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
                        <span>Hello, {username}</span>
                        <button onClick={logout} className="btn btn-danger m-2">Log Out</button>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link to="/users" className="btn btn-info te    xt-white m-2">Connect!</Link>
                        { business &&
                            <Link to='/mybusiness' className="btn btn-success text-white m-2">Inventory</Link>
                        }
                    </> :
                    <>
                        <Link className="btn btn-info text-white m-2" to="/signup/">Sign Up</Link>
                        <Link to="/login/" className="btn btn-info text-white m-2">Log In</Link>
                    </>
                }

                {isLoggedIn && userType === 'business' && (
                    <>
                        <span>Hello, {userName}</span>
                        <Link to="/profile/" className="btn btn-info text-white">Profile</Link>
                        <Link to="/orders/" className="btn btn-info text-white">Orders</Link>
                        <Link to="/transactions/" className="btn btn-info text-white">Transactions</Link>

                        <button className="btn btn-danger m-2">Log Out</button>
                    </>
                )}
                <Link to={`/users/user/${id}`} onClick={navigateToMyPage} className="btn btn-info text-white m-2">Me</Link>
                <Link to="/orders" className="btn btn-info text-white m-2">Pending Orders</Link>
                <Link to="/cart/" className="btn btn-info text-white">
                    <i className="fa fa-shopping-cart"></i> Cart
                </Link>


            </div>
        </div>
    );
}

export default Header;
