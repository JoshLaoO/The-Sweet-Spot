import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function CustomerView() {
    const [user, setUser] = useState('');
    const [userInfo, setUserInfo] = useState('')



    const getToken = async () => {
        const URL = 'http://localhost:8000/token'
        const fetchConfig = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        }
        const response = await fetch(URL, fetchConfig)
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setUser(data.access_token)
            setUserInfo(data.account)

        }

    }

    useEffect(() => {
        getToken();

    }, []);

    return (
        <div>
            <h1>{userInfo.username}</h1>
            <ul>
                <li>{userInfo.email}</li>
                <li>{userInfo.business}</li>
            </ul>

        </div>
    )
}



export default CustomerView;
