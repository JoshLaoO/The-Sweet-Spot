import React, { useState, useEffect } from 'react';
//import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function MyBusiness() {
    const navigate = useNavigate()
    const [business, setBusiness] = useState()
    const [candies, setCandies] = useState([])
    /* eslint-disable */
    useEffect(() => {
        fetchData();
    }, []);
    /* eslint-enabled */
    const fetchData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const data = await response.json();
        try {
            setBusiness(data.account.business);
        } catch (e) {
            console.error(e);
            navigate('/mainpage');
        }
        const candyURL = `${process.env.REACT_APP_API_HOST}/candy`;
        const candyResponse = await fetch(candyURL);
        if (candyResponse.ok) {
            const data = await candyResponse.json();
            setCandies(data);
        }

    }

    return (
        <div className='container text-center'>
            <Link to='/create-candy' className='col align-self-center btn btn-success text-white fw-bold'>🍭 🍫 Create a Candy! 🍭 🍬</Link>
            <Link to="/orders" className="btn btn-warning text-white m-2"><i class="fa-regular fa-clock"></i> Pending Orders</Link>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th> Candy Name </th>
                        <th> Business </th>
                        <th> Picture URL </th>
                        <th> Description </th>
                        <th> Price </th>
                        <th> Stock </th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {business ?
                        candies.filter((candy) => candy.business === business.business_id).map(candy => {
                            return (
                                <tr key={candy.id}>
                                    <td>{candy.name}</td>
                                    <td>{candy.business}</td>
                                    <td>{candy.picture_url}</td>
                                    <td>{candy.description}</td>
                                    <td type="decimal">{candy.price}</td>
                                    <td>{candy.stock}</td>
                                    <td><Link to={`/update-candy/${candy.id}`} className='btn btn-outline-warning'><i className='fa-solid fa-hammer'></i></Link></td>
                                    <td><button onClick={async () => {

                                        const url = process.env.REACT_APP_API_HOST + '/candy/candy?candy_id=' + candy.id;
                                        await fetch(url, { method: "DELETE", credentials: "include", headers: { "Content-Type": "application/json" } })
                                            .then(async (response) => {
                                                const data = await response.json()
                                                console.log(data)
                                                if (!response.ok) {
                                                    console.error("Something went wrong")
                                                }
                                            })
                                            .catch((e) => {
                                                console.log(e)
                                            });
                                        fetchData();
                                    }} className='btn btn-outline-danger'><i className='fa-solid fa-trash'></i></button></td>
                                </tr>
                            );
                        }) :
                        <div role='alert' className='position-rekative top-100  start-100  translate-middle alert alert-info text-center'>Business not found!</div>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyBusiness;