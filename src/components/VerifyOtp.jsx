// src/pages/ForgotPassword/VerifyOtp.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Email comes from ForgotPassword page
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify_otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid OTP");
      }

      // ✅ OTP is correct → go to reset password page
      navigate("/reset-password", { state: { email } });

    } catch (error) {
      setMessage(error.message || "Invalid OTP ❌. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
        <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Enter OTP</h4>
        <p className="text-muted text-center" style={{ fontSize: "0.9rem" }}>
          Please enter the OTP sent to {email}.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="form-control"
            />
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>

        {message && (
          <p className="text-center text-danger mt-2" style={{ fontSize: "0.85rem" }}>
            {message}
          </p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default VerifyOtp;
