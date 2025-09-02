import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { Form, Button } from 'react-bootstrap';

function LoginForm({ switchMode }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(formData);

      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccess('Login successful!');
      setError('');
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Check your email and password.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Form
      onSubmit={handleLogin}
      className="auth-form"
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      {/* Email field */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </Form.Group>

      {/* Password field with 👁️ inside on the left */}
      <Form.Group className="mb-3" controlId="password" style={{ position: 'relative' }}>

        <Form.Control
          type={show ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={{ paddingRight: '2.5rem' }} // give space for icon
        />
        <span
          onClick={() => setShow(!show)}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            zIndex: 2
          }}
        >
          {show ? '🙈' : '👁️'}
        </span>
      </Form.Group>

      {/* Submit button */}
      <Button type="submit" className="w-100" variant="primary">
        Login
      </Button>

      {/* Messages */}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}

      {/* Links */}
      <p style={{ marginTop: '10px' }}>
        Don't have an account?{' '}
        <span
          onClick={switchMode}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Sign up
        </span>
      </p>
      <p>
        <span style={{ color: 'blue', cursor: 'pointer' }}>
          <Link to="/forgot-password" >Forgot Password?</Link></span>
      </p>
    </Form>
  );
}

export default LoginForm;
