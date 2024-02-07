import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUsername } from './features/users/usernameSlice'
function ViewMyInfo() {

    const dispatch = useDispatch()
    dispatch(setUsername("josh"))
    const [data, setData] = useState()
    const username = useSelector((state) => state.username.username)
    console.log(username)
    const fetchMyData = async () => {
        const url = "http://localhost:8000/users/"+username
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const info = await response.json()
            setData(info)
            console.log(data)
        }
    }

    useEffect(() => {
        fetchMyData();
    }, [])
    return (
        <>
            <h1 style={{ color: "darkorange" }}>{username}'s Profile Page!</h1>
            <div key={data.id} className="col-md-4  mb-3 d-flex justify-content-center">
                <div className="col mb-3 shadow" style={{ background: "darkorange" }}>
                    <div className="p-3">
                        <div className="text-center">
                            <img src={data.picture_url} alt="user profile picture" className="rounded" style={{ width: "200px", height: "200px" }} />
                        </div>
                        <div className="card-body">
                            <h4 className='card-title' style={{ color: "white" }}>Username: {username}</h4>
                            <h4 className='card-title' style={{ color: "white" }}>Email: {data.email}</h4>
                            <h4 className="card-text mb-2" style={{ color: "white" }}>Business:{data.business}</h4>
                            <Link to={`/users/user/edit`} onClick={""} style={{ float: 'right' }} className="btn btn-info text-white m-2">Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default ViewMyInfo;
