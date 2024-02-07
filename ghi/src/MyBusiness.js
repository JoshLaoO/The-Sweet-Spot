import React, { useState, useEffect } from 'react';
function MyBusiness(props) {
    const id = props.id
    const [candies,setCandies] = useState([])
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        
        const candyURL = `http://localhost:8000/candy`
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
                        candies.map(candy => {
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