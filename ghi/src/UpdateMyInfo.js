import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateMyInfo(props) {
    const routeParams = useParams(props.userId);
    const [pictureUrl, setPictureUrl] = useState();
    const [username, setUsername] = useState();
    const [businesses, setBusinesses] = useState([]);
    const [business, setBusiness] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [submitted, setSubmitted] = useState(false);

    const getBusinesses = async () => {
        const bizUrl = await fetch(`${process.env.REACT_APP_API_HOST}/businesses`)
        if (bizUrl.ok) {
            const data = await bizUrl.json();
            setBusinesses(data)
        }
    }

    const deleteMyAccount=((userId)=>{
        if (window.confirm("Do you want to delete your account?")){
            fetch(`${process.env.REACT_APP_API_HOST}/${userId}`,
            {method:"DELETE"}).then(()=>{
                window.location.reload();
            }).catch((err)=>{
                console.log(err.message)
            })
        }
    })

    const handlePictureURLChange = (e) => {
        const value = e.target.value;
        setPictureUrl(value);
    }

    const handleNameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
    }
    const handleBusinessChange = (e) => {
        const value = e.target.value;
        setBusiness(value)
    }

    useEffect(() => {
        getBusinesses();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            picture_url: pictureUrl,
            username: username,
            email: email,
            password: password,
            business: business
        }


        const userUpdateUrl = await fetch(`${process.env.REACT_APP_API_HOST}/user/${routeParams.userId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const res = await userUpdateUrl.json()
        if (res) {
            setPictureUrl('')
            setUsername('')
            setEmail('')
            setPassword('')
            setBusiness('')
            setSubmitted(true)
        }

    }
    const messageClasses = (!submitted) ? 'alert alert-success d-none mb-0' : 'alert alert-success mb-0';
    return (
        <div className="row m-5" style={{ color: "darkorange" }}>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Update Profile</h1>
                    <button onClick={() => deleteMyAccount(routeParams.userId)} className="btn btn-danger m-2" style={{ float: 'right' }}>Delete</button>
                    <form onSubmit={handleSubmit}  id="create-update-form">
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureURLChange} value={pictureUrl} placeholder="Picture url" required type="url" name="pictureUrl" id="pictureUrl" className="form-control" />
                            <label htmlFor="pictureUrl">Picture</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={username} placeholder="Username" required type="text" name="username" id="username" className="form-control" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmailChange} value={email} placeholder="email" required type="email" name="email" id="email" className="form-control" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePasswordChange} value={password} placeholder="password" required type="text" name="password" id="password" className="form-control" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="mb-3" >
                            <select onChange={handleBusinessChange} value={business} name="business" id="business" className="form-select">
                                <option value="">Business</option>
                                {businesses.map(b => {
                                    return (
                                        <option key={b.business_id} value={b.business_id}>{b.business_name}</option>
                                    )
                                })};
                            </select>
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
