import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Send from './pages/send';
import Dashboard from './pages/dashboard';
import { login } from './services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsFirstTime(true);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      setIsLoggedIn(true);
      setIsFirstTime(false);
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const notify = () => toast("This is a toast notification !");

  return (
    <>
    <BrowserRouter>
      <Routes>
        {isFirstTime && <Route path="/" element={<Signin onLogin={handleLogin} />} />}
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="/send" element={isLoggedIn ? <Send /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter> 
      <ToastContainer />
    </>
  );
}

export default App;
