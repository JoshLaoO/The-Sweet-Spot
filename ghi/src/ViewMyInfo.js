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
            <h1 className='pacifico-regular' style={{ color: "darkorange" }}> { data.username }'s Profile Page!</h1>
            <div className="card mb-3" style={{maxheight: "320px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                        <img src={data.picture_url} className="img-fluid rounded-start" alt="user profile" />
                </div>
                    <div className="col-md-8" style={{ background: "darkorange", color: "white" }}>
                        <div className="card-body" >
                            <h3 className="card-title" >Username: {data.username}</h3>
                            <h3 className="card-text" >Email: {data.email}</h3>
                            {business ?
                                <>
                                    <h3 className='card-title' >Business: {business.business_name}</h3>
                                    <h3 className='card-title' >Business Email: {business.business_email}</h3>
                                </>
                                : <h3 className='card-title' >Customer Account</h3>}
                        </div>
                        <Link to={`/users/user/${routeParams.userId}/edit`} style={{ float: 'left' }} className="btn btn-info text-white m-2">Edit</Link>
                        <button onClick={() => deleteMyAccount(routeParams.userId)} className="btn btn-danger m-2" style={{ float: 'left' }}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewMyInfo;
