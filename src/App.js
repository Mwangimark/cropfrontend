// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginSignupPage from './pages/LoginSignupPage';
import Dashboard from './pages/Dashboard';
import Predict from './pages/Predict';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<LoginSignupPage />} />
      <Route path='/dashboard' element={<ProtectedRoute>  <Dashboard /> </ProtectedRoute>} />
      <Route path='/predict' element={<ProtectedRoute> <Predict /> </ProtectedRoute>} />
    </Routes>
  );
}

export default App;
