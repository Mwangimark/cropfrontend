import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contactus = () => {
    return (
        <>
            <Header />
            <div className="container my-5 ">
                <div className="card shadow">
                    <div className="card-body p-4" >
                        <h2 className="card-title">Email Sign Up Form</h2>
                        <p className="text-muted">We would love to be in touch with you! Please sign up to receive emails from us!</p>
                        <hr className="mb-4" />

                        <form>
                            <p className="fw-semibold mb-3">Please complete all information below:</p>

                            {/* Name */}
                            <div className="row mb-3">
                                <label className="form-label fw-semibold">Name</label>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Mr./Mrs./Ms." />
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" placeholder="First Name" />
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Last Name" />
                                </div>
                            </div>

                            {/* Email and Phone */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">E-mail</label>
                                    <input type="email" className="form-control" placeholder="example@example.com" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Phone</label>
                                    <input type="tel" className="form-control" placeholder="(000) 000-0000" />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Address</label>
                                <input type="text" className="form-control mb-2" placeholder="Street Address" />
                                <input type="text" className="form-control mb-2" placeholder="Street Address Line 2" />
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="City" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="State / Province" />
                                    </div>
                                </div>
                                <input type="text" className="form-control" placeholder="Postal / Zip Code" />
                            </div>

                            {/* Comments */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Comments, Questions, or Suggestions</label>
                                <textarea className="form-control" rows="4" placeholder="Your message..."></textarea>
                            </div>

                            {/* Submit */}
                            <div className="text-center">
                                <button type="submit" className="btn btn-success px-4">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contactus;
