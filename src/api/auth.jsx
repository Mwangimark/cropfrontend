import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (userData) => {
    try {

        const response = await fetch(`${API_BASE_URL}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error details:", errorData);  // <-- More useful logging
            throw new Error(errorData.detail || "Registration failed");
        }

        return await response.json();
    } catch (err) {
        console.error("Error in registerUser:", err);
        throw err;
    }
};


// login
export const loginUser = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/token/`, formData);
  return response.data; 
};


// Step 3: Fetch the user profile (authenticated)
// const profileResponse = await axios.get('http://127.0.0.1:8000/api/users/profile/', {
//   headers: {
//     Authorization: `Bearer ${loginResponse.access}`
//   }
// });
// console.log("User profile:", profileResponse.data);