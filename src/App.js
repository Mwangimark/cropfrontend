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
import MoreInfo from './pages/Moreinfo';
import CropIdentity from './pages/CropIdentity';
import CropInfo from './pages/CropInfo';
import ChatbotWithSubscription from './pages/ChatbotWithSubscription';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';



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
      <Route path='/predict' element={<ProtectedRoute> <Predict user={user} /> </ProtectedRoute>} />
      <Route path='/contact_us' element={<Contactus user={user} />} />
      <Route path='/more_info' element={<ProtectedRoute> <MoreInfo user={user} /> </ProtectedRoute>} />
      <Route path='/crops' element={<ProtectedRoute> <CropIdentity user={user} /> </ProtectedRoute>} />
      <Route path='/cropinfo/:id' element={<ProtectedRoute> <CropInfo user={user} /> </ProtectedRoute>} />
      <Route path='/chatbot' element={<ProtectedRoute> <ChatbotWithSubscription user={user} /> </ProtectedRoute>} />
      <Route path='/about-us' element={<AboutUs />} />
      <Route path='/services' element={<Services />} />


    </Routes>
  );
}

export default App;
