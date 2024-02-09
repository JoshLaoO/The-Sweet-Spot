import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
function MyBusiness() {
    const userID = useSelector((state)=> state.id.id)
    const [business,setBusiness] = useState()
    const [candies,setCandies] = useState([])
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const userURL = `${process.env.REACT_APP_API_HOST}/users/${userID}`
        const userResponse = await fetch(userURL);
        if (userResponse.ok) {
            const data = await userResponse.json()
            const businessURL = `${process.env.REACT_APP_API_HOST}/businesses/${data.business.business_id}`
            const businessResponse = await fetch(businessURL);
            if (businessResponse.ok) {
                const data = await businessResponse.json()
                setBusiness(data)
            }
        }

        const candyURL = `${process.env.REACT_APP_API_HOST}/candies`
        const candyResponse = await fetch(candyURL);
        if (candyResponse.ok) {
            const data = await candyResponse.json()
            setCandies(data)
        }

    }
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th> Candy Name </th>
                        <th> Business </th>
                        <th> Picture URL </th>
                        <th> Description </th>
                        <th> Price </th>
                        <th> Stock </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        candies.filter((candy) => candy.business === business.business_id).map(candy => {
                            return (
                                <tr key={candy.id}>
                                    <td>{candy.name}</td>
                                    <td>{candy.business}</td>
                                    <td>{candy.picture_url}</td>
                                    <td>{candy.description}</td>
                                    <td>{candy.price}</td>
                                    <td>{candy.stock}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default MyBusiness;