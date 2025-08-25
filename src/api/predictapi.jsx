import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Adjust as per your backend

// Get token from localStorage or context if needed
export const getAuthHeaders = () => {
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


// delete a prediction based on id
export const deletePrediction = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/recommendations/${id}/`,getAuthHeaders());
    return response // ✅ return the response data directly
  } catch (error) {
    console.error("Delete Prediction Error:", error.response?.data || error.message);
    return null;
  }
};


// get all soil_inputs descriptions
export const getSoilInputsInfo = async () => {
  try {
    const headers = getAuthHeaders(); // already contains headers
    const response = await axios.get(`${API_BASE_URL}/soil-inputs/`, headers);
    return response.data; // ✅ return the response data directly
  } catch (error) {
    console.error("Soil Inputs Info Error:", error.response?.data || error.message);
    return [];
  }
};


// user updating his profile
export const updateUserProfile = async (id, formData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/users/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update Profile Error:", error.response?.data || error.message);
    return null;
  }
};

