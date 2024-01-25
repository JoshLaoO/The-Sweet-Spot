import React, { useState } from 'react';
import './App.css';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [isBusiness, setIsBusiness] = useState(false);
    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
    const [signupError, setSignupError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response;
        const headers = {
            'Content-Type': 'application/json'
        };

        if (isBusiness) {

            const businessData = {
                business_name: username,
                business_email: email
            };
            response = await fetch('http://localhost:8000/business', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(businessData)
            });
        } else {

            const accountData = {
                email: email,
                picture_url: pictureUrl,
                username: username,
                password: password
            };
            response = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(accountData)
            });
        }


        try {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('Account created:', data);
            setIsSignupSuccessful(true);
            setSignupError(false);
        } catch (error) {
            console.error('Failed to create account:', error);
            setIsSignupSuccessful(false);
            setSignupError(true);
        }
    };

    return (
        <div className="sign-up-form-container">
            <form onSubmit={handleSubmit} className="sign-up-form">
                <div>
                    <h3>Sign Up </h3>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Picture URL:</label>
                    <input
                        type="text"
                        value={pictureUrl}
                        onChange={(e) => setPictureUrl(e.target.value)}
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
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isBusiness}
                            onChange={(e) => setIsBusiness(e.target.checked)}
                        />
                        Business Account
                    </label>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {isSignupSuccessful && <p className="success-message">Successful, please log in.</p>}
            {signupError && <p className="error-message">Failed to sign up.</p>}
        </div>
    );
}

export default SignUpPage;
