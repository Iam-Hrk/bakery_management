import React from 'react'
import aboutImage from '../assets/about.jpg'
import aboutImage1 from '../assets/about1.jpg'
import aboutImage2 from '../assets/about2.jpg'

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] flex justify-center items-center text-center">
        <img
          src={aboutImage}
          alt="about"
          className="absolute w-full h-full object-cover z-0"
        />
        <div className="z-10 text-white">
          <h1 className="text-4xl italic font-bold font-serif">About Us</h1>
        </div>
        <div className="absolute top-[65%] flex gap-4 z-10 text-yellow-100 text-sm">
          <h5>
            <a href="#" className="hover:text-yellow-300">Home</a>
          </h5>
          <h5>/</h5>
          <h5>
            <a href="#" className="hover:text-yellow-300">About Us</a>
          </h5>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Image */}
        <div className="flex justify-center items-center">
          <img
            src={aboutImage1}
            alt="aboutimg1"
            className="w-[90%] max-w-md"
          />
        </div>

        {/* Right Text */}
        <div className="text-center md:text-left p-5">
          <h3 className="text-2xl font-semibold mb-3">The beginning of our journey</h3>
          <p className="text-gray-600 mb-4">
            The beginning of our journey vel tellus Turpis purus, gravida orci,
            fringilla a. Ac sed eu fringilla odio mi. Consequat pharetra at
            magna imperdiet cursus ac faucibus sit libero...
          </p>
          <ul className="list-disc list-inside text-gray-600 text-left space-y-1">
            <li>Ultricies quam nunc, lorem sit lorem urna, pretium aliquam ut.</li>
            <li>Pulvinar commodo mollis diam sed facilisis at magna imperdiet.</li>
            <li>In vel, quis donec dolor id in.</li>
          </ul>
          <button className="mt-5 px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
            KNOW MORE
          </button>
        </div>

        {/* Second Text */}
        <div className="text-center md:text-left p-5 order-2 md:order-1">
          <h3 className="text-2xl font-semibold mb-3">Who are we?</h3>
          <p className="text-gray-600 mb-4">
            We are nunc, lorem sit lorem urna, pretium aliquam ut. In vel, quis
            donec dolor id in. Pulvinar commodo mollis diam sed facilisis at
            magna imperdiet cursus ac faucibus sit libero...
          </p>
          <button className="mt-5 px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
            KNOW MORE
          </button>
        </div>

        {/* Second Image */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <img
            src={aboutImage2}
            alt="aboutimg2"
            className="w-[90%] max-w-md"
          />
        </div>
      </div>
    </>
  )
}

export default About