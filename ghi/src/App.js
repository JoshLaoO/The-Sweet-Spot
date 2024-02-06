import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.js';
import LoginPage from './CustomerLogIn';
import SignUpPage from './signuppage.js';
import MainPage from './mainpage.js';
import Construct from './Construct.js';
import ErrorNotification from './ErrorNotification';
import Header from './header.js';
import Footer from './footer.js';
import './App.css';
import CandyForm from "./CandyForm.js";
import ViewAllUsers from './ViewAllUsers.js';
import ViewMyInfo from './ViewMyInfo.js';
import BusinessPendingOrders from './BusinessPendingOrders.js';

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');

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

  const login = (userData) => {
    setIsLoggedIn(true);
    setUserName(userData.username);
    setUserType(userData.userType); // 'user' 或 'business'
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserType('');
  };



    return (
        <AuthProvider>
            <Router>
                <Header isLoggedIn={isLoggedIn} userName={userName} userType={userType} logout={logout} />
                <ErrorNotification error={error} />
                <Routes>
                    <Route path="/signup/" element={<SignUpPage />} />
                    <Route path="/login/" element={<LoginPage login={login} />} />
                    <Route path="/mainpage/" element={<MainPage />} />
                    <Route path="/create-candy" element={<CandyForm />} />
                    <Route path="/orders" element={<BusinessPendingOrders />} />
                    <Route path="/" element={<Construct info={launchInfo} />} />
          <Route path="/users" element={<ViewAllUsers />} />
          <Route path={`/users/user/:userId`} element={<ViewMyInfo/>} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
