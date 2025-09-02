import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { API_BASE_URL } from "../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/forgot_password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json(); // read only once

      if (!response.ok) {
        // Backend error (e.g. email not found)
        alert(data.error || "Something went wrong. Try again.");
        return;
      }

      alert(data.message || "OTP sent to your email!");
      navigate("/verify-otp", { state: { email } });

    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
          {/* Title */}
          <h2 className="text-center mb-3">Forgot Password</h2>
          <p className="text-center text-muted mb-4" style={{ fontSize: "0.9rem" }}>
            Enter your email address and we’ll send you an OTP to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group mt-3">
              {/* Input */}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-control"
              />

              {/* Button inside input group */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ fontSize: "0.85rem" }}
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
