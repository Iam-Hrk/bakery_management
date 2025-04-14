import './App.css'
import Header from './header'
import Bannercarousel from './bannercarousel'
import Productslider from './productslider'
import Staticpage from './staticpage'
import Products from './products'
import Footer from './footer'
import About from './about'
import Contact from './contact'
import Backtotop from './backtotop'
import { bestprods } from "./data"; //data.js file

function App() {

  return (
    <>
      <Header />
      <Bannercarousel />
      <Productslider title="Our Products" products={bestprods}/>
      <Staticpage />
      <Products title="Our Best Sellers" products={bestprods}/>
      <About />
      <Contact />
      <Footer />
      <Backtotop />
    </>
  )
}

export default App
