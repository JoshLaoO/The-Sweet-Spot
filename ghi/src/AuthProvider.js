import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext(null);


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    console.log("Current auth token:", authToken);


    const setToken = (token) => {
        localStorage.setItem('token', token);
        setAuthToken(token);
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
    }, []);




    const authContextValue = {
        token: authToken,
        setToken
    };

    console.log("Providing context value:", { token: authToken, setToken });

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
