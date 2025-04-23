import React, { useEffect, useState, useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/images/lekshmilogo1.PNG';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   console.log("Token:", token);
  //   setIsAuthenticated(!!token);
  // }, []);

  return (
    <>
    <header>
      <div className='container-fluid md:flex-row flex-col flex items-center justify-between m-2'>
        <div className="navconact flex items-center gap-4 cursor-pointer">
          <div className="iconbox bg-amber-200 w-7 h-7 content-center text-center  border-amber-500 rounded-full">
          <i className="bi bi-telephone"></i>
          </div>
          <h6 className='text-amber-500'>6356853545</h6>
        </div>
        <div className="brand text-center items-center flex cursor-pointer">
          <img className='w-16' src={logo} alt="Logo" />
          <h1 className='text-amber-500 text-3xl font-bold'>LEKSHMI BAKERY</h1>
        </div>
        <div className="navsocial gap-4 flex items-center">
          <i className="bi bi-twitter-x cursor-pointer hover:text-gray-500 transition"></i>
          <i className="bi bi-facebook cursor-pointer hover:text-blue-400 transition"></i>
          <i className="bi bi-instagram cursor-pointer hover:text-pink-400 transition"></i>
          <i className="bi bi-youtube cursor-pointer hover:text-red-600 transition"></i>
        </div>
      </div>
      <div className="container-fluid p-4 bg-white shadow-md">
      <div className="flex justify-between md:justify-center items-center">

        {/* Hamburger Icon for Small Screens */}
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        {/* Nav Items for Medium and Up */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-[4vw]">
            <li><Link  className="hover:text-blue-300" to="/">Home</Link></li>
            <li><Link  className="hover:text-blue-300" to="/about">About</Link></li>
            <li><Link  className="hover:text-blue-300" to="/products">Products</Link></li>
            <li><Link  className="hover:text-blue-300" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="wishcart absolute right-3 gap-5 flex items-center">
        <Link to="/cart"><i className="bi bi-cart2 cursor-pointer hover:text-blue-300"></i></Link>
        <i className="bi bi-heart cursor-pointer hover:text-red-300"></i>
        {isAuthenticated ? (
          <Link to="/profile"><i className="bi bi-person-check cursor-pointer hover:text-red-300 text-xl"></i></Link>
        ):(
          <Link to="/login"><i className="bi bi-person-plus cursor-pointer hover:text-blue-300 text-xl"></i></Link>
        )}
        </div>
      </div>

      {/* Nav Items for Small Screens */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col items-center gap-4">
            <li><a href="#" className="hover:text-blue-300">Home</a></li>
            <li><a href="#" className="hover:text-blue-300">About Us</a></li>
            <li><a href="#" className="hover:text-blue-300">Products</a></li>
            <li><a href="#" className="hover:text-blue-300">Contact Us</a></li>
          </ul>
        </div>
      )}
    </div>
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap');
    .brand h1 {
      font-family: 'Sour Gummy', sans-serif;
    }
    `}</style>
    </header>
    </>
  )
}

export default Header