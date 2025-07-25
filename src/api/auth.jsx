import axios from "axios";



export const registerUser = async (userData) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/users/', {
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
  const response = await axios.post('http://127.0.0.1:8000/api/token/', formData);
  return response.data; 
};


// Step 3: Fetch the user profile (authenticated)
// const profileResponse = await axios.get('http://127.0.0.1:8000/api/users/profile/', {
//   headers: {
//     Authorization: `Bearer ${loginResponse.access}`
//   }
// });
// console.log("User profile:", profileResponse.data);