import React, { useState } from 'react';
import './App.css';
import backgroundImg from './images/background.png';
import { useDispatch } from 'react-redux';
import { changeToken } from './features/token/tokenSlice';
import useToken from '@galvanize-inc/jwtdown-for-react';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [isBusinessAccount, setIsBusinessAccount] = useState(false);
    const [signupError, setSignupError] = useState('');
    const [userToken, setUserToken] = useState('');
    const { token } = useToken;


    const dispatch = useDispatch();
    const handleUserSubmit = async (event) => {
        event.preventDefault();
        const signUpUrl = `${process.env.REACT_APP_API_HOST}/users`;
        const userData = {
            email: email,
            username: username,
            password: password,
            picture_url: ""
        };

        try {
            const response = await fetch(signUpUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                         Authorization: `Bearer ${token}` },
                body: JSON.stringify(userData),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const responseData = await response.json();
            dispatch(changeToken(responseData.access_token))
            setUserToken(responseData.access_token);
            setIsUserRegistered(true);
        } catch (error) {
            console.error('Failed to create user account:', error);
            setSignupError('Failed to sign up. Please try again.');
        }
    };

    const handleBusinessSubmit = async (event) => {
        event.preventDefault();
        const businessSignUpUrl = `${process.env.REACT_APP_API_HOST}/business`;
        const businessData = {
            business_name: businessName,
            business_email: businessEmail
        };

        try {
            const response = await fetch(businessSignUpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(businessData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }



            alert('Business account created successfully!');
        } catch (error) {
            console.error('Failed to create business account:', error);
            alert('Failed to create business account. Please try again.');
        }

    }

    return (
        <div className="sign-up-form-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
            {!isUserRegistered ? (
                <form onSubmit={handleUserSubmit} className="sign-up-form">
                    <h3>User Sign Up</h3>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Sign Up</button>
                    {signupError && <p className="error-message">{signupError}</p>}
                </form>
            ) : !isBusinessAccount ? (
                <div className="business-decision">
                    <button onClick={() => setIsBusinessAccount(true)}>Yes, I want to create a business account</button>
                    <button onClick={() => alert('Registration complete!')}>No businesss account, only users</button>
                </div>
            ) : (
                <form onSubmit={handleBusinessSubmit} className="business-account-form">
                    <h3>Business Account Registration</h3>
                    <label>Business Name:</label>
                    <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                    <label>Business Email:</label>
                    <input type="email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} />
                    <button type="submit">Create Business Account</button>
                </form>
            )}
        </div>
    );
}

export default SignUpPage;
