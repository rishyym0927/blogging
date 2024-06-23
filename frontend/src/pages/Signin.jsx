import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { UserContext } from '../contexts/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8001/user/signin',
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Login successful');
        await fetchUserDetails();
        navigate('/');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      toast.error('Login failed: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black p-10 rounded-lg w-full max-w-sm border border-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-white">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-black border border-white text-white rounded"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-black border border-white text-white rounded"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-white text-black font-bold border border-white rounded">Log In</button>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
