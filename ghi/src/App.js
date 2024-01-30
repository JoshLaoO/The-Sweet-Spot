import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './CustomerLogIn';
import SignUpPage from './signuppage.js';
import MainPage from './mainpage.js';
import Construct from './Construct.js';
import ErrorNotification from './ErrorNotification';
import Header from './header.js';
import Footer from './footer.js';
import './App.css';

function App() {
    const [launchInfo, setLaunchInfo] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
            try {
                let response = await fetch(url);
                let data = await response.json();

                if (response.ok) {
                    setLaunchInfo(data.launch_details);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Failed to fetch launch details");
            }
        }
        getData();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Header />
                <ErrorNotification error={error} />
                <Routes>
                    <Route path="/signup/" element={<SignUpPage />} />
                    <Route path="/login/" element={<LoginPage />} />
                    <Route path="/mainpage/" element={<MainPage />} />
                    <Route path="/" element={<Construct info={launchInfo} />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
