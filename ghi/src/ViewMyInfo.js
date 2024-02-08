import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function ViewMyInfo(props) {
    const routeParams = useParams(props.userId)
    const [data, setData] = useState([])


    const fetchMyData = async () => {
        const url = await fetch(`http://localhost:8000/users/${routeParams.userId}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const res = await url.json()
        setData(res)

    }

    useEffect(() => {
        fetchMyData();
    }, )

    console.log(data)

    return (
        <>
            <h1 style={{ color: "darkorange" }}>{data.username}'s Profile Page!</h1>
            <div key={data.id} className="col-md-4  mb-3 d-flex justify-content-center">
                <div className="col mb-3 shadow" style={{ background: "darkorange" }}>
                    <div className="p-3">
                        <div className="text-center">
                            <img src={data.picture_url} alt="user profile" className="rounded" style={{ width: "200px", height: "200px" }} />
                        </div>
                        <div className="card-body">
                            <h4 className='card-title' style={{ color: "white" }}>Username: {data.username}</h4>
                            <h4 className='card-title' style={{ color: "white" }}>Email: {data.email}</h4>
                            <h4 className="card-text mb-2" style={{ color: "white" }}>Business:{data.business}</h4>
                            <Link to={`/users/user/${routeParams.userId}/edit`} onClick={""} style={{ float: 'right'}}className="btn btn-info text-white m-2">Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default ViewMyInfo;
