import React, { useState } from "react";
import mpesaImg from "../assets/mpesa.png";
import cardImg from "../assets/card.png";
import paypalImg from "../assets/paypal.png";
import { makingPaymentsstk } from "../api/chatbot.api";
import axios from "axios";

const SubscriptionForm = ({ onSubscriptionActive }) => {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(""); // pending, success, error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    setLoading(true);
    setError("");
    setStatus("pending");

    try {
      const res = await makingPaymentsstk(phone); // call API
      if (res) {
        // start polling immediately
        pollSubscriptionStatus();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to initiate payment. Try again.");
      setStatus("error");
      setLoading(false);
    }
  };

  const pollSubscriptionStatus = async () => {
    let elapsed = 0;
    const intervalTime = 5000; // poll every 5 sec
    const maxTime = 30000; // 30 sec max

    const interval = setInterval(async () => {
      elapsed += intervalTime;

      try {
        const statusRes = await axios.get("/api/subscription-status/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        });

        if (statusRes.data.is_active) {
          setStatus("success");
          setLoading(false);
          clearInterval(interval);
          onSubscriptionActive(); // unlock chatbot automatically
        }
      } catch (err) {
        console.error(err);
      }

      if (elapsed >= maxTime) {
        clearInterval(interval);
        if (status !== "success") {
          setStatus("");
          setLoading(false);
          setError("Payment not completed. Try again.");
        }
      }
    }, intervalTime);
  };



  return (
    <div
      className="subscription-card p-4 text-center text-white"
      style={{
        backgroundColor: "green",
        borderRadius: "12px",
        maxWidth: "450px",
        border: "2px solid grey",
        margin: "auto",
      }}
    >
      <h3 className="mb-3">Subscribe to Chatbot</h3>
      <p>Get expert agricultural advice from our AI-powered chatbot!</p>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter your phone (e.g. 07xxxxxxxx)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div className="d-flex justify-content-around mb-3">
        <img
          src={mpesaImg}
          alt="M-Pesa"
          style={{ width: "80px", cursor: "pointer" }}
          onClick={handleSubscribe}
        />
        <img
          src={paypalImg}
          alt="PayPal"
          style={{ width: "80px", cursor: "not-allowed", opacity: 0.5 }}
          title="Coming soon"
        />
        <img
          src={cardImg}
          alt="Card"
          style={{ width: "80px", cursor: "not-allowed", opacity: 0.5 }}
          title="Coming soon"
        />
      </div>



      {loading && <div className="spinner-border text-light mt-3" role="status" />}
      {status === "pending" && !loading && <p>Waiting for M-Pesa confirmation...</p>}
      {status === "success" && <p className="text-success">Subscription Active! You can use the chatbot now.</p>}
      {error && <p className="text-danger">{error}</p>}
      <div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleSubscribe}
          disabled={loading || status === "pending"}
        >
          {loading || status === "pending" ? "Processing..." : "Make Payment"}
        </button>
      </div>

      <small>Your subscription will last 30 days from activation.</small>
    </div>
  );
};

export default SubscriptionForm;
