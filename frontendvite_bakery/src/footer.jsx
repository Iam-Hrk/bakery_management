import React from 'react'
import logo from './assets/images/lekshmilogo1.PNG';

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white pt-10 pb-6 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
            
            {/* Logo & Description */}
            <div>
              <div className="flex text-center items-center">
                <img className='w-16' src={logo} alt="logo" />
                <h5 className="text-3xl font-bold footer-logo">LEKSHMI BAKERY</h5>
              </div>
              
              <p className="text-sm">
                Making your website shine with elegant design and modern functionality.
              </p>
            </div>
  
            {/* Contact Info */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Contact</h5>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:text-yellow-400 transition">Cake Store Inc.</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">Salinas, CA</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">831-585-4398</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">contact@yourcompany.com</a></li>
              </ul>
            </div>
  
            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Quick Links</h5>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">Services</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">Contact Us</a></li>
              </ul>
            </div>
  
            {/* Social Links */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Follow Us</h5>
              <div className="flex justify-center md:justify-start space-x-4 text-xl">
                <a href="#" className="hover:text-blue-400 transition"><i className="bi bi-facebook"></i></a>
                <a href="#" className="hover:text-gray-500 transition"><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="hover:text-pink-400 transition"><i className="bi bi-instagram"></i></a>
                <a href="#" className="hover:text-red-600 transition"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
          </div>
  
          <hr className="my-6 border-gray-600" />
  
          {/* Bottom */}
          <div className="text-center text-sm">
            <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
        <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap');
    .footer-logo {
      font-family: 'Sour Gummy', sans-serif;
    }
    `}</style>
      </footer>
    );
  };
  
  export default Footer;
  