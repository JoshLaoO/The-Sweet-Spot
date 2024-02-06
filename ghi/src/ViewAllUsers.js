import React, { useState, useEffect } from 'react';

function ViewAllUsers() {
    const [users, setUsers] = useState([[], [], []]);
    const getUsers = async () => {
        const url = 'http://localhost:8000/users';

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        try {
            const response = await fetch(url, config)
            if (response.ok) {
                const data = await response.json();
                setUsers(data)
                console.log(data)
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);


    return (
        <>
            <div className='container'>
                <div className='row'>
                    {users.map((user) => {
                        return (
                            <div key={user.id} className="col-md-4  mb-3 d-flex justify-content-center">
                                <div className="col mb-3 shadow" style={{ background: "darkorange" }}>
                                    <div className="p-3">
                                        <div className="text-center">
                                            <img src={user.picture_url} alt="user profile picture" className="rounded" style={{ width: "200px", height: "200px" }} />
                                        </div>
                                        <div className="card-body">
                                            <h4 className='card-title' style={{ color: "white" }}>Username: {user.username}</h4>
                                            <h4 className='card-title' style={{ color: "white" }}>Email: {user.email}</h4>
                                            <h4 className="card-text mb-2" style={{ color: "white" }}>Business:{user.business}</h4>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </>
    );
};



export default ViewAllUsers;