import React, { createContext, useState, useEffect } from "react";

export const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null); // Initialize error state

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:8001/blog/", {
        credentials: "include", // Include cookies with the request
      });

      const contentType = response.headers.get("content-type");
      const data = await response.json();
      console.log("datasss", data)
     await setBlogs(data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    console.log(`Blogs fetched successfully`, blogs);
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, error }}>
      {children}
    </BlogContext.Provider>
  );
};
