import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function ViewMyInfo(props) {
    const routeParams = useParams(props.userId)
    const [data, setData] = useState([])
    const [business, setBusiness] = useState()


    const deleteMyAccount = ((routeParams) => {
        console.log(routeParams)
        if (window.confirm("Do you want to delete your account?")) {
            fetch(`${process.env.REACT_APP_API_HOST}/users/${routeParams}`,
                { method: "DELETE", credentials: 'include' }).then(() => {
                    window.location.href = /mainpage/
                }).catch((err) => {
                    console.log(err.message)
                })
        }

    })
    /* eslint-disable */
    useEffect(() => {
        async function fetchMyData() {
            const url = `${process.env.REACT_APP_API_HOST}/users/${routeParams.userId}`;

            const config = {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }

            try {
                const res = await fetch(url, config)
                if (res.ok) {
                    const d = await res.json();
                    setData(d)
                    setBusiness(d.business)
                }

            } catch (e) {
                console.error(e)

            }


        };
        console.log('hello')
        fetchMyData();
    }, []);

    /* eslint-enable */

    return (
        <>
            <h1 style={{ color: "darkorange" }}>{data.username}'s Profile Page!</h1>
            <div className="col-md-4  mb-3 d-flex justify-content-center">
                <div className="col mb-3 shadow" style={{ background: "darkorange" }}>
                    <div className="p-3">
                        <div className="text-center">
                            <img src={data.picture_url} alt="user profile" className="rounded" style={{ width: "200px", height: "200px" }} />
                        </div>
                        <div className="card-body">
                            <h4 className='card-title' style={{ color: "white" }}>Username: {data.username}</h4>
                            <h4 className='card-title' style={{ color: "white" }}>Email: {data.email}</h4>
                            {business ?
                                <>
                                    <h4 className='card-title' style={{ color: "white" }}>Business: {business.business_name}</h4>
                                    <h4 className='card-title' style={{ color: "white" }}>Business Email: {business.business_email}</h4>
                                </>
                                : <h4 className='card-title' style={{ color: "white" }}>Customer Account</h4>}
                            <button onClick={() => deleteMyAccount(routeParams.userId)} className="btn btn-danger m-2" style={{ float: 'right' }}>Delete</button>
                            <Link to={`/users/user/${routeParams.userId}/edit`} style={{ float: 'right' }} className="btn btn-info text-white m-2">Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default ViewMyInfo;
