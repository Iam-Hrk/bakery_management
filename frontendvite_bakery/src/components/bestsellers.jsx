import React, { useEffect, useState } from 'react';
import ProductService from '../services/product_service';

const Bestsellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const data = await ProductService.getBestsellers();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load bestseller products:', error);
      }
    };

    fetchBestsellers();
  }, []);

  return (
    <div className="bg-yellow-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Bestseller Products
        </h2>

        {/* Slider for small screens */}
        <div className="block md:hidden overflow-x-auto">
          <div className="flex space-x-4">
            {products.map((product) => (
              <div
                key={product.product_id}
                className="min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {product.image && (
                  <img
                    src={`http://localhost:8000${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-2">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid for medium and large screens */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
