import React from 'react'
import bakeryimage from './assets/bakery1.png';

const Staticpage = () => {
    return (
      <div className="w-full md:h-screen h-full flex flex-col text-center items-center justify-center py-10 px-4 bg-[#F4F8D3] ">
        <h1 className="text-4xl mb-3">With Love</h1>
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-8 text-center mt-5">
          {/* Left Content */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="p-5">
              <h5 className="text-xl font-semibold text-gray-800 mb-2">AUTHENTIC RECIPES</h5>
              <p className="text-gray-600">Our products are based on traditional home-style recipes using fresh ingredients.</p>
            </div>
            <div className="p-5">
              <h5 className="text-xl font-semibold text-gray-800 mb-2">BAKED WITH LOVE</h5>
              <p className="text-gray-600">Our passion for baking is poured into every recipe, serving smiles on a plate everyday.</p>
            </div>
          </div>
  
          {/* Center Image */}
          <div className="w-full md:w-1/3">
            <img
              src={bakeryimage}
              alt="Bakery Illustration"
              className="w-full h-auto object-contain max-h-80"
            />
          </div>
  
          {/* Right Content */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="p-5">
              <h5 className="text-xl font-semibold text-gray-800 mb-2">COMMITTED TO QUALITY</h5>
              <p className="text-gray-600">From our ingredients to our kitchen operations & guest services, we always prioritize quality.</p>
            </div>
            <div className="p-5">
              <h5 className="text-xl font-semibold text-gray-800 mb-2">HONESTLY PRICED</h5>
              <p className="text-gray-600">We constantly strive to offer the best products at the right prices.</p>
            </div>
          </div>
        </div>
  
        {/* Button */}
        <div className="text-center mt-10">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300">
            KNOW MORE
          </button>
        </div>
      </div>
    );
  };
  
        
              {/* Custom Styles */}
              {/* <style>{`
            
                .Static_main{
                  background-color: #F4F8D3;
                  font-family: Arial, sans-serif;
                  text-align: center;
                  height: 100vh;
                  object-fit: cover;
                  }
                .feature-text {
                  color: #9c7925;
                  font-weight: bold;
                }
                .btn-custom {
                  background-color: #d4b887;
                  color: white;
                  border-radius: 20px;
                  padding: 10px 20px;
                  border: none;
                }
                .btn-custom:hover {
                  background-color: #c4a475;
                  color: #F4F8D3;
                }
                .feature-img img {
                  max-width: 100%;
                  height: auto;
                }
                @media (max-width: 768px) {
                  .feature-section {
                    flex-direction: column;
                    text-align: center;
                  }
                  .feature-img {
                    order: -1;
                  }
                    .Static_main{
                    height: 100%;
                    }
                }
              `}</style> */}
//             </div>
//   )
// }

export default Staticpage