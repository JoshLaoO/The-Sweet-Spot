import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UpdateMyInfo(props) {
    const token = useSelector((state) => state.token.token);
    const routeParams = useParams(props.userId);
    const [pictureUrl, setPictureUrl] = useState();
    const [businesses, setBusinesses] = useState([]);
    const [business, setBusiness] = useState();

    // const updateMyData = async () => {
    //     const url = await fetch(`http://localhost:8000/users/${routeParams.userId}`, {
    //         method: "POST",
    //         body: JSON.stringify(data)
    //         headers: { 'Content-Type': 'application/json' },
    //         credentials: 'include'
    //     })
    //     const res = await url.json()
    //     console.log(res)
    // }

    // useEffect(() => {
    //     fetchMyData();
    // } [])

    return (
        <div className="row m-5">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Update Profile</h1>
                    <form onSubmit={''} id="create-update-form">
                        <div className="form-floating mb-3">
                            <input onChange={''} value={pictureUrl} placeholder="Picture url" required type="text" name="pictureUrl" id="pictureUrl" className="form-control" />
                            <label htmlFor="pictureUrl">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={''} value={business} required name="business" id="business" className="form-select">
                                <option value="">Business</option>
                                {businesses.map(b => {
                                    return (
                                        <option key={b.business_id} value={b.business_id}>{b.business_name}</option>
                                    )
                                })};
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={''} value={email} placeholder="email" required type="text" name="email" id="email" className="form-control" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={''} value={password} placeholder="password" required type="text" name="password" id="password" className="form-control" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button className="btn btn-info text-white">Update</button>
                    </form>
                </div>
                <div className={messageClasses} role="alert">
                    Profile Updated!
                </div>
            </div>
        </div>
    )

}

export default UpdateMyInfo;
