import React, { useState } from 'react';
import backgroundImg from './images/background.png';
import './App.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isBusinessLogin, setIsBusinessLogin] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginUrl = isBusinessLogin ? 'http://localhost:8000/business/login' : 'http://localhost:8000/login';

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Login successful:', data);

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
    <div className="login-page-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form" id="login-form">
                <h3>{isBusinessLogin ? 'Business Log In' : 'User Log In'}</h3>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="buttons-container">
                    <button type="submit">Log In</button>
                    <button onClick={() => setIsBusinessLogin(!isBusinessLogin)} className="toggle-login-type">
                        {isBusinessLogin ? 'User account? Click here' : 'Business account? Click here'}
                    </button>
                </div>
            </form>
        </div>
    </div>
);

}

export default LoginPage;
