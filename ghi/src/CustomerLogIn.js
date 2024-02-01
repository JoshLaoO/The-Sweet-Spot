import React, { useState } from 'react';
//import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from './images/background.png';
import useToken from '@galvanize-inc/jwtdown-for-react';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
//    const { setToken } = useAuth();
    const navigate = useNavigate();
    const { login } = useToken();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', email);
        formData.append('password', password);

        try {
                const response = await fetch('http://localhost:8000/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData,
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.status}`);
            }
            login(email,password)
            //const data = await response.json();
            //setToken(data.access_token);
            //console.log(data.access_token)

            //if (data.account && data.account.business) {
            //    navigate('/business-profile');
            //} else {
            //    navigate('/mainpage');
            //}
            navigate("/mainpage")
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-page-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
            <div className="login-form-container">
                <form onSubmit={handleSubmit} className="login-form">
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
