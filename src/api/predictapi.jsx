import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust as per your backend

// Get token from localStorage or context if needed
const getAuthHeaders = () => {
  const token = localStorage.getItem('access'); // assumes you stored JWT as accessToken
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};


// Prediction API
export const predictCrops = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Prediction API failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Prediction Error:", error);
    return null;
  }
};



//  get past predictions of a specific user
export const getPastPredictions = async () => {
  try {
    const headers = getAuthHeaders(); // already contains headers

    const response = await axios.get(
      `${API_BASE_URL}/recommendations/my-recommendations/`,
      headers // ✅ pass the object directly
    );

    return response.data;
  } catch (error) {
    console.error("Prediction Error:", error);
    return null;
  }
};


// contact us api
export const contactUs = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact-us/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Contact Us API failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Contact Us Error:", error);
    return null;
  }
}




