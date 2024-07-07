import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8001/user/signup', formData);
      if (response.status === 201) {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Signup error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-gray-600 focus:ring-gray-600 transition duration-300 ease-in-out hover:bg-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-gray-600 focus:ring-gray-600 transition duration-300 ease-in-out hover:bg-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-gray-600 focus:ring-gray-600 transition duration-300 ease-in-out hover:bg-gray-700"
              required
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;