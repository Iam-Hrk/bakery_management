import axios from 'axios';

// Base API URL
const API_BASE_URL = 'http://localhost:8000/api';

// Function to get products with optional filters
const getProducts = async (category = '', sort = '') => {
  try {
    const params = {};
    if (category) params.category = category;
    if (sort) params.sort = sort;

    const response = await axios.get(`${API_BASE_URL}/products/`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const getCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/categories/`);
    return response.data;
  };

const getBestsellers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/bestsellers/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bestseller products:', error);
      throw error;
    }
  };

export default {
  getProducts, getCategories, getBestsellers,
};
