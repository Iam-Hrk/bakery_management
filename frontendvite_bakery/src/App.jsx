import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/header'
import Home from './pages/home'
import Products from './pages/products'
import Footer from './components/footer'
import About from './pages/about'
import Contact from './pages/contact'
import Login from './pages/login'
import Signup from './pages/signup';
import Profile from './pages/profile';
import Cart from './pages/cart';
import Wishlist from './pages/wishlist';
import Backtotop from './backtotop'
import Orders from './pages/orders';



function App() {

  return (
    <>
      <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        
      <Footer />
      <Backtotop />
    </>
  )
}

export default App
