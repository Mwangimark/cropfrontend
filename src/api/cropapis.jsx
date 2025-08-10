import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from './predictapi';

// retrieving all crops

export const getallCrops = async () => {
  try {
    const headers = getAuthHeaders(); // already contains headers

    const response = await axios.get(
      `${API_BASE_URL}/crops/`,
       headers 
    );

    return response.data;
  } catch (error) {
    console.error("Prediction Error:", error);
    return null;
  }
};


// get crop by id
export const getCropById = async (id) => {
  try {
    const headers = getAuthHeaders(); // already contains headers

    const response = await axios.get(
      `${API_BASE_URL}/crops/${id}/`,
      headers // ✅ pass the object directly
    );

    return response.data;
  } catch (error) {
    console.error("Get Crop by ID Error:", error);
    return null;
  }
}
