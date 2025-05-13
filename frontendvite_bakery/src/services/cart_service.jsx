import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to get the latest token and return headers
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
});

const getCartItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart/`, { headers: authHeaders() });
  return response.data;
};

const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post(
    `${API_BASE_URL}/cart/add/`,
    { product_id: productId, quantity },
    { headers: authHeaders() }
  );
  return response.data;
};

const removeFromCart = async (itemId) => {
  const response = await axios.delete(`${API_BASE_URL}/cart/remove/${itemId}/`, {
    headers: authHeaders(),
  });
  return response.data;
};

const updateCartQuantity = async (itemId, quantity) => {
  const response = await axios.patch(
    `${API_BASE_URL}/cart/update/`,
    { item_id: itemId, quantity },
    { headers: authHeaders() }
  );
  return response.data;
};

export default { getCartItems, addToCart, removeFromCart, updateCartQuantity };
