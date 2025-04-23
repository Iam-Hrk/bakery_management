import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // Replace with your actual API URL

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,  // Pass the token
      },
    });
    console.log("User profile data:", response.data);  // Debugging line to check the response
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;  // You can handle this error as needed in your component
  }
};
