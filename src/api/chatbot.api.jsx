import axios from "axios";
import { API_BASE_URL } from "./predictapi";


// chatbotAPI
export const chatbotAPI = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chatbot/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Chatbot API failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Chatbot Error:", error);
    return null;
  }
};


// ?subscription
export const fetchSubscription = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/subscription-status/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    return res.data; // return only the response data
  } catch (err) {
    console.error("Failed to fetch subscription status", err);
    return null; // return null if failed
  }
};

// billing and payments
export const makingPaymentsstk = async (phone) => {
  try {
    const response = await fetch(`${API_BASE_URL}/billing/subscribe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ phone }),
    });

    if (!response.ok) {
      throw new Error("Failed to initiate payment. Try again.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error.", error);
    return null;
  }
};
