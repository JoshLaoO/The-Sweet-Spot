import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8000/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setAuthToken(data.access_token);
                setUserInfo(data.account); // 假设登录响应中包含用户信息
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const contextValue = {
        authToken,
        userInfo,
        login
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
