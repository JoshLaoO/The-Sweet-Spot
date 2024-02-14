import React, { useState, useEffect } from 'react';
//import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function MyBusiness() {
    const navigate = useNavigate()
    const [business, setBusiness] = useState()
    const [candies, setCandies] = useState([])
    //const [wasDeleted, toggleWasDeleted] = useState(false)
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
        console.log(data);
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

                    {business !== null ?
                        candies.filter((candy) => candy.business === business.business_id).map(candy => {
                            return (
                                <tr key={candy.id}>
                                    <td>{candy.name}</td>
                                    <td>{candy.business}</td>
                                    <td>{candy.picture_url}</td>
                                    <td>{candy.description}</td>
                                    <td type="decimal">{candy.price}</td>
                                    <td>{candy.stock}</td>
                                    <td><button className='btn btn-outline-warning text-black'><i className='fa-solid fa-hammer'></i></button></td>
                                    <td><button onClick={async () => {
                                        console.log("This will get deleted: ", candy.name)
                                        // const url = process.env.REACT_APP_API_HOST + '/candy/' + candy.id;
                                        // console.log(url)
                                        // await fetch(url, { method: "DELETE", credentials: "include", headers: { "Content-Type": "application/json" } })
                                        //     .then((response) => {
                                        //         if (!response.ok) {

                                        //         }
                                        //         toggleWasDeleted(!wasDeleted);
                                        //     })
                                        //     .catch((e) => {
                                        //         console.log(e)
                                        //     });
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