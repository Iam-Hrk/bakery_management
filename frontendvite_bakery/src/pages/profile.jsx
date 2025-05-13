import React, { useEffect, useState, useContext } from 'react';
import { getUserProfile } from '../services/profileService';
import { logoutUser } from '../services/loginsignup_service';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        console.log('Fetched userData:', userData);
        setUser(userData);
      } catch (err) {
        setError('Failed to load user data or session expired. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate('/login');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10 mb-10">{error} 
  <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
    <Link to="/login" className=" hover:text-gray-300">Login</Link>
  </button>
  </div>;

  return (
    <div className="min-h-auto flex flex-col items-center justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-center text-amber-600 mb-8">User Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 text-white rounded-lg p-6">
            <i className="bi bi-emoji-sunglasses text-6xl mb-4"></i>
            <h2 className="text-lg">Welcome,</h2>
            <h1 className="text-2xl font-semibold">{user?.username}</h1>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder={user?.username}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  placeholder={user?.email}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  placeholder={user?.mobile_number}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Address</label>
                <textarea
                  placeholder="123, ABC Street, Your City"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
              {/* <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Update
              </button> */}
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="myorder mt-5">
        <h3>my orders <Link to="/orders" className="underline hover:text-gray-300"> click here</Link></h3>
      </div>
    </div>
  );
};

export default Profile;
