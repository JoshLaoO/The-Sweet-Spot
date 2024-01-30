import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import backgroundImg from './images/background.png';
import { useNavigate } from 'react-router-dom';
import './App.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isBusinessLogin, setIsBusinessLogin] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('API URL:', process.env.REACT_APP_API_URL);

        // 使用 /token 路由进行登录
        const loginUrl = `${process.env.REACT_APP_API_URL}/login`;


        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            const { token } = await response.json();
            setToken(token);
            // 根据登录类型导航到不同的页面
            navigate(isBusinessLogin ? '/business-dashboard' : '/user-dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Login failed. Please try again.');
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
                        <button
                            type="button"
                            onClick={() => setIsBusinessLogin(!isBusinessLogin)}
                            className="toggle-login-type"
                        >
                            {isBusinessLogin ? 'User account? Click here' : 'Business account? Click here'}
                        </button>
                    </div>
                </form>
                {loginError && <p className="error-message">{loginError}</p>}
            </div>
        </div>
    );
}

export default LoginPage;
