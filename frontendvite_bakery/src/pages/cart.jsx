import React, { useEffect, useState } from 'react';
import CartService from '../services/cart_service';
import OrderService from '../services/order_service';

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

  const placeOrder = async () => {
    try {
      const response = await OrderService.placeOrder();
      alert(response.detail);
      setCartItems([]); // empty cart after placing order
    } catch (error) {
      alert('Failed to place order. Please try again.');
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

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      await CartService.updateCartQuantity(itemId, newQty);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (error) {
      console.error('Failed to update quantity', error);
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
              <img
                src={`http://localhost:8000${item.image}`}
                alt={item.product_name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.product_name}</h3>
                <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
                  >
                    −
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={placeOrder}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
        
      )}
    </div>
  );
};

export default Cart;
