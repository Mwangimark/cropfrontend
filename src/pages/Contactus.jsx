import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { contactUs } from '../api/predictapi';

const Contactus = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await contactUs(formData);
            if (!response) {
                throw new Error("Failed to submit form");
            }
            setSubmitted(true);
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="container my-5 col-md-4 rounded shadow" >
                <div className="card shadow" style={{ marginTop: "5.5rem" }}>
                    <div className="card-body" >
                        <h2 className="card-title">Contact us Form</h2>
                        <p className="text-muted">We would love to be in touch with you! Please fill out the form below to get in touch with us!</p>
                        <hr className="mb-4" />

                        {submitted ? (
                            <div className="alert alert-success">Thanks! Your message was sent.</div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <p className="fw-semibold mb-3">Please complete all information below:</p>

                                <div className="row mb-3">
                                    <label className="form-label fw-semibold">Name</label>
                                    <div className="col-md-6">
                                        <input type="text" name="first_name" className="form-control" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="last_name" className="form-control" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">E-mail</label>
                                        <input type="email" name="email" className="form-control" placeholder="example@example.com" value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Phone</label>
                                        <input type="tel" name="phone" className="form-control" placeholder="(000) 000-0000" value={formData.phone} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Address</label>
                                    <div className="row">
                                        <div className="col-md-4 mb-2">
                                            <input type="text" name="city" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-8 mb-2">
                                            <input type="text" name="address" className="form-control" placeholder="State / Province" value={formData.address} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label fw-semibold">Comments, Questions, or Suggestions</label>
                                    <textarea name="message" className="form-control" rows="4" placeholder="Your message..." value={formData.message} onChange={handleChange}></textarea>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-success px-4">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contactus;
