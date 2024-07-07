import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogContext } from '../../contexts/BlogContext';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormComponent = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [coverImageURL, setCoverImageURL] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { refetchBlogs } = useContext(BlogContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8001/blog/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, body, coverImageURL }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      refetchBlogs();
      toast.success('Blog post created successfully!');
      navigate(`/editorials`);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400 } },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6 max-w-2xl mx-auto mt-8 p-8 bg-[#0a0a0a] rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <motion.input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border-2 border-[#2a2a2a] text-white shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200"
            variants={inputVariants}
            whileFocus="focus"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="body" className="block text-sm font-medium text-gray-300 mb-2">
            Body
          </label>
          <motion.textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={6}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border-2 border-[#2a2a2a] text-white shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200"
            variants={inputVariants}
            whileFocus="focus"
          ></motion.textarea>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="coverImageURL" className="block text-sm font-medium text-gray-300 mb-2">
            Cover Image URL
          </label>
          <motion.input
            type="url"
            id="coverImageURL"
            value={coverImageURL}
            onChange={(e) => setCoverImageURL(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border-2 border-[#2a2a2a] text-white shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200"
            variants={inputVariants}
            whileFocus="focus"
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-purple-500 disabled:opacity-50 transition duration-200"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {isSubmitting ? 'Submitting...' : 'Create Blog Post'}
        </motion.button>
      </motion.form>
    </>
  );
};

export default FormComponent;