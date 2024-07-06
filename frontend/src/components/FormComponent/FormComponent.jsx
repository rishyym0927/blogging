// src/components/FormComponent.jsx
import React, { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          placeholder="Enter your message"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
