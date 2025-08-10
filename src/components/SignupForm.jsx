import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import Loading from './Loading';

function SignupForm({ switchMode }) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const result = await registerUser(formData);
            console.log("Success:", result);
            setSuccess("Account created! Check your email to verify.");
            setError('');

            setTimeout(() => {
                switchMode();
            }, 2000);

        } catch (err) {
            console.error("Failed to register:", err);
            setError("Signup failed. Please try again.");
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };


    return loading ? (
        <Loading />
    ) : (
        <form onSubmit={handleSubmit} className="auth-form">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Signup</button>

            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
        </form>
    );
}

export default SignupForm;
