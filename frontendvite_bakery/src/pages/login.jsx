import React, { useState, useContext } from "react";
import bgImage from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/loginsignup_service";
import { getUserProfile } from "../services/profileService"; // ✅ import profile fetcher
import { AuthContext } from "../context/AuthContext"; // ✅ import AuthContext

const Login = () => {
  const { setUser, login } = useContext(AuthContext); // ✅ correct use
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // const response = await loginUser(formData);
      // login and get tokens
      await loginUser(formData);

      // get user profile and update context
      const profile = await getUserProfile();
      // console.log("Login successful:", response);
      console.log("Login successful, user profile:", profile);
      setUser(profile); // ✅ Set context
      login(); // ✅ update global auth state
      // Debug: Check if token is saved
      console.log("Access Token:", localStorage.getItem('access_token'));

      navigate("/profile"); // redirect to home or dashboard
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
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
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

          {error && (
            <div className="text-red-300 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <div className="relative border-b-2 border-gray-300 my-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
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

          <div className="relative border-b-2 border-gray-300 my-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent h-10 text-white placeholder-transparent focus:outline-none peer"
            />
            <label className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-base transition-all duration-200 peer-focus:opacity-0 peer-valid:opacity-0">
              Enter your password
            </label>
          </div>

          <div className="flex justify-between items-center text-sm mt-6 mb-8">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-white" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black font-semibold py-3 rounded-md transition-all duration-300 hover:bg-white/20 hover:text-white border-2 border-transparent hover:border-white disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="text-center text-sm mt-6">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/signup">
                <span className="underline hover:text-gray-300">Register</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
