import React, { useState } from 'react';
import '../components/LoginSignupPage.css'; // styling
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LoginSignupPage({switchMode}) {
  const [activeForm, setActiveForm] = useState('signup');

  return (
    <>
      <Header />
      <div className="auth-wrapper">
        <div className="auth-box">
          <h2 className="text-center">{activeForm === 'signup' ? 'SIGN UP' : 'LOGIN'}</h2>
          <div className="toggle-buttons">
            <button
              className={activeForm === 'login' ? 'active' : ''}
              onClick={() => setActiveForm('login')}
            >
              Login
            </button>
            <button
              className={activeForm === 'signup' ? 'active' : ''}
              onClick={() => setActiveForm('signup')}
            >
              Signup
            </button>
          </div>
          
          {/* 🟡 Pass switchMode to child */}
          {activeForm === 'signup' ? (
            <SignupForm switchMode={() => setActiveForm('login')} />
          ) : (
            <LoginForm switchMode={() => setActiveForm('signup')} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginSignupPage;
