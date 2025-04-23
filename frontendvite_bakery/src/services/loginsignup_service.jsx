import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Update if backend URL changes

// Save tokens in localStorage
const storeTokens = (tokens) => {
  localStorage.setItem('access_token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
};

// Signup
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Save JWT tokens
    if (response.data.tokens) {
      storeTokens(response.data.tokens);
    }
    return response.data;
  } catch (error) {
    return error.response?.data || { error: 'Signup failed' };
  }
};

// Login
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Save JWT tokens
    if (response.data.tokens) {
      storeTokens(response.data.tokens);
    }
    return response.data;
  } catch (error) {
    return error.response?.data || { error: 'Login failed' };
  }
};

// Logout (client-side only unless you implement refresh token blacklist)
export const logoutUser = async () => {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Optional: also call your backend logout if needed
    const response = await axios.post(`${API_URL}/logout/`);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: 'Logout failed' };
  }
};

// Utility to get auth headers for protected requests
export const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
});
