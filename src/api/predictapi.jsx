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
    const response = await fetch("http://localhost:8000/api/recommendations/", {
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

// get predictions of an individual user
// export const getPastPredictions = async ()={
//   try{
//     const response = 
//   }
// }

