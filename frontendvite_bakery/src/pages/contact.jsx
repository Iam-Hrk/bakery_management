import React from "react";
import aboutImage from '../assets/about.jpg'

const Contact = () => {
  return (
    <>
      <div className="relative w-full h-[40vh] flex justify-center items-center text-center">
        <div className="absolute z-20 text-white text-base">
          <h1 className="font-bold italic text-4xl font-sans">Contact Us</h1>
        </div>
        <div className="flex gap-4 justify-center items-center absolute top-[65%] text-wheat z-20 text-wheat">
          <h5><a href="#" className="no-underline text-wheat">Home</a></h5>
          <h5>/</h5>
          <h5><a href="#" className="no-underline text-wheat">Contact Us</a></h5>
        </div>
        <img className="w-full h-full object-cover absolute" src={aboutImage} alt="about" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full md:w-10/12">
            <div className="shadow-2xl rounded-xl overflow-hidden mt-10 mb-10">
              <div className="flex flex-col md:flex-row">
                {/* Left Form */}
                <div className="w-full md:w-1/2 bg-white p-6 md:p-10">
                  <h3 className="mb-4 text-xl font-semibold">Send us a message</h3>
                  <form method="POST" id="contactForm" name="contactForm" className="space-y-4">
                    <input type="text" name="name" id="name" placeholder="Name" className="w-full border-b-2 border-teal-400 p-2 outline-none" />
                    <input type="email" name="email" id="email" placeholder="Email" className="w-full border-b-2 border-teal-400 p-2 outline-none" />
                    <input type="text" name="subject" id="subject" placeholder="Subject" className="w-full border-b-2 border-teal-400 p-2 outline-none" />
                    <textarea name="message" id="message" cols="30" rows="6" placeholder="Message" className="w-full border-b-2 border-teal-400 p-2 outline-none resize-none"></textarea>
                    <button type="submit" className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition">Send Message</button>
                  </form>
                </div>

                {/* Right Info */}
                <div className="w-full md:w-1/2 bg-teal-200 p-6 md:p-10 flex items-center">
                  <div className="space-y-6 w-full">
                    <h3 className="text-lg font-semibold">Contact us</h3>
                    <p className="mb-4 text-sm">We're open for any suggestion or just to have a chat</p>

                    <div className="flex items-start gap-4">
                      <div className="w-29 md:w-14  h-12 bg-teal-600 text-white flex items-center justify-center rounded-full">
                      <i class="bi bi-geo-alt"></i>
                      </div>
                      <div className="text">
                        <p><span className="font-medium">Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-600 text-white flex items-center justify-center rounded-full">
                      <i class="bi bi-telephone"></i>
                      </div>
                      <div className="text">
                        <p><span className="font-medium">Phone:</span> <a href="tel://1234567920" className="text-gray-600">+ 1235 2355 98</a></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-600 text-white flex items-center justify-center rounded-full">
                      <i class="bi bi-send"></i>
                      </div>
                      <div className="text">
                        <p><span className="font-medium">Email:</span> <a href="mailto:info@yoursite.com" className="text-gray-600">info@yoursite.com</a></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-600 text-white flex items-center justify-center rounded-full">
                      <i class="bi bi-globe-central-south-asia"></i>
                      </div>
                      <div className="text">
                        <p><span className="font-medium">Website:</span> <a href="#" className="text-gray-600">yoursite.com</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Right Info */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
