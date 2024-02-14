import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeToken } from './features/token/tokenSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
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
            setUsername('')
            setId('')
            setBusiness('')
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
        if (res.account.business)
            setBusiness(res.account.business.business_name)

        setId(userId)
        setUsername(res.account.username)
    }
    /* eslint-disable */
    useEffect(() => {
        navigateToMyPage();
    }, [token]);
    /* eslint-enable */
    return (
        <div className="header-container">
            <Link to="/mainpage/" className="btn btn-info header-title pacifico-regular">TheSweetSpot</Link>
            <div className="w-25 p-2">
                <i className="fa-solid fa-magnifying-glass m-1"></i>
                <input type="text" className="search-box" placeholder="Search for candies" />
            </div>

                {token.length > 0 ?
                    <>
                        <h1 className='honk-banner-name'>Hello, {username}</h1>
                        <button onClick={logout} className="btn btn-danger m-2">Log Out</button>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link to="/users" className="btn btn-info te    xt-white m-2">Connect!</Link>
                        <Link to={`/users/user/${id}`} onClick={navigateToMyPage} className="btn btn-info text-white m-2">Me</Link>
                        {business &&
                            <Link to='/mybusiness' className="btn btn-success text-white m-2">Inventory</Link>
                        }
                    </> :
                    <>
                        <Link className="btn btn-info text-white m-2" to="/signup/">Sign Up</Link>
                        <Link to="/login/" className="btn btn-info text-white m-2">Log In</Link>
                    </>
                }
                <Link to="/orders" className="btn btn-info text-white m-2">Pending Orders</Link>
                <Link to="/cart/" className="btn btn-info text-white">
                    <i className="fa fa-shopping-cart"></i> Cart
                </Link>


            </div>
    );
}

export default Header;
