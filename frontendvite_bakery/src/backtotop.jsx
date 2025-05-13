import React from 'react'
import { useEffect, useState } from "react";

const Backtotop = () => {
    const [visible, setVisible] = useState(false);

    // Show button after scrolling down 300px
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.scrollY > 300) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      };
  
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  
    return (
      visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 w-10 h-10 text-center items-center justify-center flex right-6 z-50 p-3 rounded-full bg-teal-500 text-white shadow-md hover:bg-teal-600 transition duration-300"
          aria-label="Back to Top"
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )
    );
  };

export default Backtotop