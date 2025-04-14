import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { SlideData } from "./data";

const Bannercarousel = () => {
  return (
    <div className='relative container-fluid w-full h-screen'>
      <Swiper
        className="container-fluid w-full h-screen"
        direction="horizontal"
        slidesPerView={1}
        effect="fade"
        spaceBetween={30}
        speed={1500}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        modules={[Mousewheel, Pagination, Autoplay, EffectFade, Navigation]}
      >
        {SlideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-container w-full h-full flex items-center justify-center">
              <motion.img
                src={slide.img}
                alt={slide.alt}
                className="banimg w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              />
                <div className="info absolute top-1/2 left-1/2 gap-7 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20 px-4">
                <h1 className="text-6xl font-bold mb-4" style={{ color: slide.color }}>
                    {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                <button className="slidbtn mt-5 bg-white text-black px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition">
                    Click Here
                </button>
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="p-5 bg-amber-50 custom-swiper-button-prev hidden md:block text-black text-3xl absolute top-1/2 left-0 z-10 cursor-pointer">
        <i class="bi bi-arrow-left-short"></i>
      </div>
      <div className=" p-5 bg-amber-50 custom-swiper-button-next hidden md:block text-black text-3xl absolute top-1/2 right-0 z-10 cursor-pointer">
        <i class="bi bi-arrow-right-short"></i> 
      </div>
      <style>
        {`
          .custom-bullet {
            width: 10px;
            height: 10px;
          }
          .swiper-pagination-bullet-active {
            background-color: rgb(142, 238, 206);
            width: 25px;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Bannercarousel;
