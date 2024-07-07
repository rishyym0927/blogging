import React, { createContext, useState, useEffect, useCallback } from "react";

export const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("BlogContext: Fetching blogs");
      const response = await fetch("http://localhost:8001/blog/", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBlogs(data);
      setError(null);
      console.log("BlogContext: Blogs fetched successfully", data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const value = {
    blogs,
    error,
    isLoading,
    refetchBlogs: fetchBlogs
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};