import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";
import SubscriptionForm from "./SubscriptionForm";
import Footer from "../components/Footer";
import DashboardHeader from "../components/DashboardHeader";
import { fetchSubscription } from "../api/chatbot.api";

const ChatbotWithSubscription = ({ user }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch subscription status on mount
  useEffect(() => {
    const checkSubscription = async () => {
      setLoading(true);
      const data = await fetchSubscription();
      if (data && data.is_active) {
        setIsSubscribed(true);
      }
      console.log(data)
      setLoading(false);
    };
    checkSubscription();
  }, []);


  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <DashboardHeader user={user} />

      <div style={{ position: "relative", minHeight: "80vh" }}>
        <div
          style={{
            filter: isSubscribed ? "none" : "blur(4px)",
            pointerEvents: isSubscribed ? "auto" : "none",
            transition: "filter 0.3s ease-in-out",
          }}
        >
          <Chatbot user={user} />
        </div>

        {!isSubscribed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div
              style={{
                position: "relative",
                background: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                maxWidth: "400px",
                width: "100%",
              }}
            >
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>

              <SubscriptionForm
                user={user}
                onSubscriptionActive={() => setIsSubscribed(true)}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ChatbotWithSubscription;
