import React, { useState } from "react";
import bgImage from "../assets/login.jpg";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/loginsignup_service";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile_number: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signupUser(formData);
      console.log("Signup successful:", data);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/30 rounded-lg p-8 text-white">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

          {/* Username */}
          <div className="relative border-b-2 border-gray-300 my-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoFocus
              className="peer w-full bg-transparent h-10 text-white placeholder-transparent focus:outline-none"
              placeholder="Enter your username"
            />
            <label
              className="absolute left-0 text-white top-2 text-base transition-all duration-200 
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
              peer-focus:top-[-10px] peer-focus:text-sm peer-valid:top-[-10px] peer-valid:text-sm"
            >
              Enter your username
            </label>
          </div>

          {/* Email */}
          <div className="relative border-b-2 border-gray-300 my-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer w-full bg-transparent h-10 text-white placeholder-transparent focus:outline-none"
              placeholder="Enter your email"
            />
            <label
              className="absolute left-0 text-white top-2 text-base transition-all duration-200 
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
              peer-focus:top-[-10px] peer-focus:text-sm peer-valid:top-[-10px] peer-valid:text-sm"
            >
              Enter your email
            </label>
          </div>

          {/* Mobile Number */}
          <div className="relative border-b-2 border-gray-300 my-6">
            <input
              type="tel"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
              className="peer w-full bg-transparent h-10 text-white placeholder-transparent focus:outline-none"
              placeholder="Enter your phone number"
            />
            <label
              className="absolute left-0 text-white top-2 text-base transition-all duration-200 
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
              peer-focus:top-[-10px] peer-focus:text-sm peer-valid:top-[-10px] peer-valid:text-sm"
            >
              Enter your phone number
            </label>
          </div>

          {/* Password */}
          <div className="relative border-b-2 border-gray-300 my-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent h-10 text-white placeholder-transparent focus:outline-none peer"
              placeholder="Enter your password"
            />
            <label className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-base transition-all duration-200 peer-focus:opacity-0 peer-valid:opacity-0">
              Enter your password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-white text-black font-semibold py-3 rounded-md transition-all duration-300 hover:bg-white/20 hover:text-white border-2 border-transparent hover:border-white"
          >
            Sign Up
          </button>

          {/* Already registered? */}
          <div className="text-center text-sm mt-6">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="underline hover:text-gray-300">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
