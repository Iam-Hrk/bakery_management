import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import ProductService from '../services/product_service';


const Ourproducts = () => {
  const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const data = await ProductService.getCategories();
          setCategories(data);
        } catch (error) {
          console.error('Failed to load categories:', error);
        }
      };
  
      fetchCategories();
    }, []);

  return (
    <div className="w-full px-4 py-8 relative">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Our Products
      </h2>

      {/* Navigation Buttons */}
      <div className="absolute top-5 hidden right-4 z-10 md:flex  gap-2">
        <button className="custom-prev bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700 transition duration-200">
            <i class="bi bi-chevron-left"></i>
        </button>
        <button className="custom-next bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700 transition duration-200">
            <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <Swiper
        modules={[FreeMode, Pagination, Navigation]}
        spaceBetween={10}
        freeMode={true}
        loop={true}
        pagination={{ clickable: true,
            el: '.custom-pagination', // your custom class
         }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4 },
        }}
        className="pt-5" // to push slider down so nav buttons don't overlap
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            {/* <Card item={item} /> */}
            <>
              <div className=" w-full  max-w-xs bg-white overflow-hidden flex flex-col items-center group">
                <div className="overflow-hidden  w-50 h-60 sm:w-70 sm:h-70  md:h-70 lg:h-90">
                    <img
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    src={`http://localhost:8000${cat.image}`}
                    alt={cat.name}
                    />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mt-3 text-center">{cat.name}</h3>
              </div>
            </>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination md:hidden mt-6 flex justify-center gap-2" />
    </div>
  )
}

// const Card = ({ item }) => {
//   return (
//     <>
//       <div className=" w-full  max-w-xs bg-white overflow-hidden flex flex-col items-center group">
//         <div className="overflow-hidden  w-50 h-60 sm:w-70 sm:h-70  md:h-70 lg:h-90">
//             <img
//             className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
//             src={item.imageUrl}
//             alt={item.name}
//             />
//         </div>
//       </div>
//       <div>
//         <h3 className="text-2xl font-semibold mt-3 text-center">{item.name}</h3>
//       </div>
//     </>
//   )
// }

export default Ourproducts
