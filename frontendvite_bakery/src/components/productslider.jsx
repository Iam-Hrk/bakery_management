import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductService from '../services/product_service';

const Productslider = () => {
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
    <div className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Bestseller Products
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.product_id} className="bg-black rounded-xl w-40 h-full shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* <ProductCard item={item} /> */}
            {product.image && (
                <img
                  src={`http://localhost:8000${product.image}`}
                  alt={product.name}
                  className="w-40 h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2">${product.price}</p>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ✅ Renamed to avoid conflict
// const ProductCard = ({ item }) => {
//   return (
//     <div className="w-full max-w-xs bg-white rounded-xl shadow-md overflow-hidden p-4 hover:shadow-lg transition duration-300 flex flex-col items-center">
//       <img
//         className="w-48 h-48 object-cover rounded"
//         src={item.imageUrl}
//         alt={item.name}
//       />
//       <h3 className="text-lg font-semibold mt-3 text-center">{item.name}</h3>
//       <p className="text-sm text-gray-500 mt-1 text-center">{item.price}</p>
//       <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
//         Explore More
//       </button>
//     </div>
//   );
// };

export default Productslider;
