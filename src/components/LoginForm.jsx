import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';



function LoginForm({switchMode}) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const data = await loginUser(formData);

      localStorage.setItem('access',data.access); 
      localStorage.setItem('refresh',data.refresh);
      localStorage.setItem('user',JSON.stringify(data.user))
      
      
      setSuccess("Login successful!");
      setError('');
      navigate('/dashboard')

      console.log("User data:", data);

    } catch (err) {
      setError("Login failed. Check your email and password.");
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };
  return loading ? ( <Loading /> ) : 
  (
    <form onSubmit={handleLogin} className="auth-form">
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Login</button>

      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>{success}</p>}

     <p>Don't have an account? <span onClick={switchMode}>Sign up</span></p>

    </form>
  );
}

export default LoginForm;
