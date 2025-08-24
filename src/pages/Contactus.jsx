import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { contactUs } from "../api/predictapi";
import { motion } from "framer-motion";

const Contactus = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await contactUs(formData);
            if (!response) throw new Error("Failed to submit form");
            setSubmitted(true);
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                message: "",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <Header />
            <section
                className="py-3 text-center text-white"
                style={{
                    background: "linear-gradient(135deg, #28a745, #218838)",
                    Height: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "3.5rem"
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="p-4 p-md-5 rounded shadow-lg"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                    <h1 className="display-4 fw-bold">Contact Us</h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="lead mt-3"
                        style={{ maxWidth: "700px", margin: "0 auto" }}
                    >
                        <p className="text-center text-muted mb-4">
                            We’d love to hear from you! Fill out the form below and our team will get back
                            to you shortly.
                        </p>
                    </motion.p>
                </motion.div>
            </section>

            {/* 🔹 Background Section with Gradient */}
            <div
                style={{
                    background: "linear-gradient(135deg, #bdc2beff, #f1f4f2ff)",
                    minHeight: "85vh", // ✅ section height
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0px",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container"
                    style={{ maxWidth: "500px" }} // ✅ narrower card
                >
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-body p-3"> {/* ✅ smaller padding */}
                            <h3 className="card-title text-center fw-bold text-success mb-3">
                                Contact Us
                            </h3>

                            {submitted ? (
                                <div className="alert alert-success text-center">
                                    ✅ Thanks! Your message has been sent.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">First Name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                className="form-control form-control-sm" // ✅ smaller input
                                                placeholder="John"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                className="form-control form-control-sm"
                                                placeholder="Doe"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control form-control-sm"
                                                placeholder="example@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control form-control-sm"
                                                placeholder="+254 700 000 000"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label fw-semibold">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control form-control-sm"
                                            placeholder="Nairobi"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label fw-semibold">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control form-control-sm"
                                            placeholder="Street / Province"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Message</label>
                                        <textarea
                                            name="message"
                                            className="form-control form-control-sm"
                                            rows="3" // ✅ smaller height
                                            placeholder="Your message..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-sm px-4 fw-semibold" // ✅ smaller button
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>


            <Footer />
        </>
    );
};

export default Contactus;
