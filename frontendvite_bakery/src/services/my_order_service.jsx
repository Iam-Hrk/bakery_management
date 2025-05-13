// order_service.jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

const getToken = () => localStorage.getItem('access_token');

export const fetchUserOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/my-orders/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};
