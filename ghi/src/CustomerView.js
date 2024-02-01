import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function CustomerView() {
    const [user, setUser] = useState('');
    const [userInfo, setUserInfo] = useState('')



    const getToken = async (id) => {
        const URL = 'http://localhost:8000/token'
        const fetchConfig = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        }
        const response = await fetch(URL, fetchConfig)
        if (response.ok) {
            const data = await response.json();
            console.log(data.account)
            setUser(data.access_token)
            setUserInfo(data.account)

        }

    }

    useEffect(() => {
        getToken();

    }, []);

    if (userInfo.business === null) {
        return (
            <div>
                <h1>{userInfo.username}</h1>
                <ul>
                    <li>{userInfo.email}</li>
                </ul>

            </div>
        );
    } else {

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
    }



export default CustomerView;
