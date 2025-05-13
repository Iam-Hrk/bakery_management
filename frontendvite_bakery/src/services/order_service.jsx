import axios from 'axios';

const OrderService = {
  placeOrder: async () => {
    const token = localStorage.getItem('access_token');  // Adjust to your stored token key

    if (!token) {
      throw new Error('No authentication token found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,  // Ensure the token is prefixed with 'Bearer '
      },
    };

    try {
      const response = await axios.post('http://localhost:8000/api/place-order/', {}, config);
      return response.data;
    } catch (error) {
      console.error('Failed to place order', error);
      throw error;
    }
  }
};

export default OrderService;

