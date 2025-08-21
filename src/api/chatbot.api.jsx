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

