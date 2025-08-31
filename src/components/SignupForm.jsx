import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { registerUser } from '../api/auth';
import Loading from './Loading';

function SignupForm({ switchMode }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // toggle visibility state
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    });

    const toggle = (field) =>
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
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
        <Form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="phone">
                <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
            </Form.Group>

            {/* Password field */}
            <Form.Group className="mb-3" controlId="password">
                <InputGroup>

                    <Form.Control
                        type={show.password ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    />
                    <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => toggle("password")}
                        style={{
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            minWidth: "3rem"
                        }}
                    >
                        {show.password ? "🙈" : "👁️"}
                    </Button>
                </InputGroup>
            </Form.Group>

            {/* Confirm Password field */}
            <Form.Group className="mb-3" controlId="confirmPassword">
                <InputGroup>

                    <Form.Control
                        type={show.confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    />
                    <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => toggle("confirmPassword")}
                        style={{
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            minWidth: "3rem"
                        }}
                    >
                        {show.confirmPassword ? "🙈" : "👁️"}
                    </Button>
                </InputGroup>

            </Form.Group>

            <Button type="submit" className="w-100" variant="primary">
                Signup
            </Button>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
        </Form>
    );
}

export default SignupForm;
