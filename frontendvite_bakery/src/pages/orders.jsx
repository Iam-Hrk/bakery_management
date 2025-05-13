// my_order.jsx
import React, { useEffect, useState } from 'react';
import { fetchUserOrders } from '../services/my_order_service';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchUserOrders();
                setOrders(data);
            } catch (error) {
                // You can redirect to login if token is expired, etc.
                console.error('Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;

    return (
        <>
        <div className="order-container max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="order-card flex items-center justify-between border-b py-4">
                        <h4>Order ID: {order.id}</h4>
                        <div className="flex-1 ml-4">
                            <p>Total: ₹{order.total_price}</p>
                            <p>Ordered at: {new Date(order.ordered_at).toLocaleString()}</p>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.product_name} x {item.quantity} - ₹{item.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
      </>
    );
};

export default Orders;
