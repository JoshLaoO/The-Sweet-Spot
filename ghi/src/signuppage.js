import React, { useState } from 'react';
import './App.css';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [isBusiness, setIsBusiness] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isBusiness) {
            // 处理商业账户注册
            const businessData = {
                business_name: username, // 假设商业名称使用用户名字段
                business_email: email
            };

            try {
                const response = await fetch('http://localhost:8000/business', { // 商业账户的后端地址
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(businessData)
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                console.log('Business account created:', data);
            } catch (error) {
                console.error('Failed to create business account:', error);
            }
        } else {
            // 处理个人账户注册
            const accountData = {
                email: email,
                picture_url: pictureUrl,
                username: username,
                password: password
            };

            try {
                const response = await fetch('http://localhost:8000/users', { // 个人账户的后端地址
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(accountData)
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                console.log('Account created:', data);
            } catch (error) {
                console.error('Failed to create account:', error);
            }
        }
    };

    return (
        <div className="sign-up-form-container">
            <form onSubmit={handleSubmit} className="sign-up-form">
                <div>
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
        </div>
    );
}

export default SignUpPage;
