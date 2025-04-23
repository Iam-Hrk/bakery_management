import React from 'react'
import Bannercarousel from '../components/bannercarousel'; // Assuming Bannercarousel is exported from bannercarousel.jsx
import { bestprods } from '../data'; // Assuming bestprods is exported from data.js
import Staticpage from '../components/staticpage'; // Assuming Staticpage is exported from staticpage.jsx
import Ourproducts from '../components/ourproducts';
import Bestsellers from '../components/bestsellers'; // Assuming Bestsellers is exported from bestsellers.jsx

const Home = () => {
  return (
    <>
      <Bannercarousel />
      <Ourproducts title="Our Products" products={bestprods}/>
      <Staticpage />
      <Bestsellers />
    </>
  )
}

export default Home