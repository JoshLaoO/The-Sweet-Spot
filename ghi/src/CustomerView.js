import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function CustomerView() {
    const [user, setUser] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [userId, setUserId] = useState('');



    const getToken =  () => {
        const URL = 'http://localhost:8000/token'
        const fetchConfig = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        }
        const response =  fetch(URL, fetchConfig)

        if (response.ok) {
            const data =  response.json();
            setUserId(data.account.id)
            setUser(data.access_token)
            console.log(user)



        }

    }


    const getUserInfo = async () => {
        const userUrl = `http://localhost:8000/users/${userId}`;

        const fetchConfig = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        }
        const response = await fetch(userUrl, fetchConfig);
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            setUserInfo(data)

        }
    }


    console.log(userInfo)


    useEffect(() => {
        getToken();
        getUserInfo();
    }, []);

    return (
        <div>
            <h1>{userInfo.username}</h1>
            <ul>
                <li>{userInfo.email}</li>
                <li>{userInfo.picture_url}</li>
            </ul>

        </div>
    )
}



export default CustomerView;
