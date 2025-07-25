import React, { useState } from 'react';
import { registerUser } from '../api/auth';

function SignupForm({ switchMode }) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const result = await registerUser(formData);
        console.log("Success:", result);
        setSuccess("Account created! Check your email to verify.");
        setError('');

        // 🔁 Wait a moment then switch to login form
        setTimeout(() => {
        switchMode(); // 👈 this will switch to login form
        }, 2000); // Optional delay (2 seconds) so user can read the success message

    } catch (err) {
        console.error("Failed to register:", err);
        setError("Signup failed. Please try again.");
        setSuccess('');
    }
    };


    return (
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
