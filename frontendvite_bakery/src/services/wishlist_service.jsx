import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to get the latest token and return headers
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
});

const getWishlistItems = async () => {
    const response = await axios.get(`${API_BASE_URL}/wishlist/`, { headers: authHeaders() });
    return response.data;
  };

  const addToWishlist = async (productId) => {
    const response = await axios.post(
      `${API_BASE_URL}/wishlist/add/`,
      { product_id: productId },
      { headers: authHeaders() }
    );
    return response.data;
  };

  const removeFromWishlist = async (itemId) => {
    const response = await axios.delete(`${API_BASE_URL}/wishlist/remove/${itemId}/`, {
      headers: authHeaders(),
    });
    return response.data;
  };

export default { getWishlistItems, addToWishlist, removeFromWishlist };