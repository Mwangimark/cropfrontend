// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginSignupPage from './pages/LoginSignupPage';
import Dashboard from './pages/Dashboard';
import Predict from './pages/Predict';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Contactus from './pages/Contactus';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.warn("Invalid stored user:", storedUser);
        localStorage.removeItem('user');
      }
    }
  }, []);


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<LoginSignupPage />} />
      <Route path='/dashboard' element={<ProtectedRoute>  <Dashboard user={user} /> </ProtectedRoute>} />
      <Route path='/predict' element={<ProtectedRoute> <Predict user = {user} /> </ProtectedRoute>} />
      <Route path='/contact_us' element={<Contactus/>} />
    </Routes>
  );
}

export default App;
