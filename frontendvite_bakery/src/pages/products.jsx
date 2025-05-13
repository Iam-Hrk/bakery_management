import React, { useEffect, useState, useContext } from 'react';
import ProductService from '../services/product_service';
import CartService from '../services/cart_service';
import WishlistService from '../services/wishlist_service';
import { AuthContext } from '../context/AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]); // ✅ Wishlist items
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [category, sort]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchWishlist = async () => {
    try {
      const data = await WishlistService.getWishlistItems();
      const wishlistIds = data.map(item => item.product); // just store product IDs
      setWishlist(wishlistIds);
    } catch (error) {
      console.error('Failed to fetch wishlist');
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await ProductService.getProducts(category, sort);
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products');
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await ProductService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await CartService.addToCart(productId);
      alert('Added to cart!');
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await WishlistService.addToWishlist(productId);
      await fetchWishlist(); // ✅ Refresh wishlist state
      alert('Added to wishlist!');
    } catch (error) {
      console.error('Add to wishlist failed:', error);
    }
  };

  const groupProductsByCategory = () => {
    const grouped = {};
    products.forEach((prod) => {
      const catName = prod.category_name || 'Uncategorized';
      if (!grouped[catName]) {
        grouped[catName] = [];
      }
      grouped[catName].push(prod);
    });
    return grouped;
  };

  const renderProductCard = (product) => {
    const isInWishlist = wishlist.includes(product.product_id); // ✅ check if product is in wishlist
    return (
      <div
        key={product.product_id}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        {product.image && (
          <img
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          <div className="mt-3 text-yellow-600 font-bold">₹{product.price}</div>
          <div className="flex justify-between items-center">
            {isAuthenticated ? (
              <button
                className="mt-4 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm transition duration-300"
                onClick={() => handleAddToCart(product.product_id)}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className="mt-4 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm transition duration-300"
                onClick={() => alert('Please login to add to cart')}
              >
                Add to Cart
              </button>
            )}
            {isInWishlist ? (
              <i className="bi bi-heart-fill text-red-600 text-xl mt-3 cursor-pointer"></i>
            ) : (
              <i
                className="bi bi-heart mt-3 text-xl cursor-pointer hover:text-red-600"
                onClick={() => handleAddToWishlist(product.product_id)}
              ></i>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Products</h2>
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price Low to High</option>
            <option value="price_desc">Price High to Low</option>
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
          </select>
        </div>

        {/* Products Grid */}
        {category === '' ? (
          Object.entries(groupProductsByCategory()).map(([catName, prods]) => (
            <div key={catName} className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">{catName}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {prods.map((prod) => renderProductCard(prod))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((prod) => renderProductCard(prod))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
