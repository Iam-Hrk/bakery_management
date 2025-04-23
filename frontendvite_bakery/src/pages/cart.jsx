import React, { useEffect, useState } from 'react';
import CartService from '../services/cart_service';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await CartService.getCartItems();
      setCartItems(data);
    } catch (err) {
      console.error('Failed to fetch cart');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await CartService.removeFromCart(itemId);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Failed to remove item');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <img src={`http://localhost:8000${item.image}`} alt={item.product_name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.product_name}</h3>
                <p>₹{item.price} × {item.quantity}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
