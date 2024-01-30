import React, { useState } from 'react';
import './App.css';
import backgroundImg from './images/background.png';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isBusiness, setIsBusiness] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
    const [signupError, setSignupError] = useState(false);

    const handleUserSubmit = async (event) => {
        event.preventDefault();

        const signUpUrl = 'http://localhost:8000/users';
        const signUpData = {
            email: email,
            username: username,
            password: password
        };

        try {
            const response = await fetch(signUpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('User account created:', data);
            setIsSignupSuccessful(true);
            setSignupError(false);
        } catch (error) {
            console.error('Failed to create user account:', error);
            setIsSignupSuccessful(false);
            setSignupError(true);
        }
    };

    const handleBusinessSubmit = async (event) => {
        event.preventDefault();

        const signUpUrl = 'http://localhost:8000/business';
        const signUpData = {
            business_name: businessName,
            business_email: businessEmail
        };

        try {
            const response = await fetch(signUpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('Business account created:', data);
            setIsSignupSuccessful(true);
            setSignupError(false);
        } catch (error) {
            console.error('Failed to create business account:', error);
            setIsSignupSuccessful(false);
            setSignupError(true);
        }
    };

    return (
        <div className="sign-up-form-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
            <form onSubmit={handleUserSubmit} className="sign-up-form">
                <div>
                    <h3>Sign Up</h3>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>

            {isSignupSuccessful && (
                <div>
                    <p className="success-message">User account created successfully, please log in.</p>
                    <form onSubmit={handleBusinessSubmit} className="business-sign-up-form">
                        <h3>Register Business Account</h3>
                        <label>Business Name:</label>
                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                        />
                        <label>Business Email:</label>
                        <input
                            type="email"
                            value={businessEmail}
                            onChange={(e) => setBusinessEmail(e.target.value)}
                        />
                        <button type="submit">Create Business Account</button>
                    </form>
                </div>
            )}

            {signupError && <p className="error-message">Failed to sign up.</p>}
        </div>
    );
}

export default SignUpPage;
