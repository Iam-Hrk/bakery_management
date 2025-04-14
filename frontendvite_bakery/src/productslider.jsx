import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Productslider = ({ title,products }) => {
  return (
    <div className="w-full px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        {title}
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ✅ Renamed to avoid conflict
const ProductCard = ({ item }) => {
  return (
    <div className="w-full max-w-xs bg-white rounded-xl shadow-md overflow-hidden p-4 hover:shadow-lg transition duration-300 flex flex-col items-center">
      <img
        className="w-48 h-48 object-cover rounded"
        src={item.imageUrl}
        alt={item.name}
      />
      <h3 className="text-lg font-semibold mt-3 text-center">{item.name}</h3>
      <p className="text-sm text-gray-500 mt-1 text-center">{item.price}</p>
      <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
        Explore More
      </button>
    </div>
  );
};

export default Productslider;
