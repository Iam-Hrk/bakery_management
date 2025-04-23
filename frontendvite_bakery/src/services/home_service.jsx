import axios from 'axios';

// Base API URL
const API_BASE_URL = 'http://localhost:8000/api';

const getBanner = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/banner/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bestseller products:', error);
      throw error;
    }
  };

export default {
     getBanner,
};