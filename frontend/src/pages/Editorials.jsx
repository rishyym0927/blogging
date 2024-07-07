import React, { useContext, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "daisyui/dist/full.css";
import { BlogContext } from "../contexts/BlogContext";
import FormComponent from "../components/FormComponent/FormComponent";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from "react-router-dom";

const EditorialPage = () => {
  const { blogs, isLoading: isBlogsLoading, error, refetchBlogs } = useContext(BlogContext);
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    navigate(`/editorials/${blogId}`);
  };

  useEffect(() => {
    refetchBlogs();
  }, [refetchBlogs]);

  const tabs = useMemo(() => [
    { id: "tab1", title: "All Posts", content: blogs },
    { id: "tab2", title: "Featured", content: blogs.filter(blog => blog.featured) },
    { id: "tab5", title: "New Post", content: [] },
  ], [blogs]);

  const handleTabChange = (tabId) => {
    setLoading(true);
    setSelectedTab(tabId);
    setTimeout(() => setLoading(false), 300);
  };

  const BlogSkeleton = () => (
    <div className="w-full bg-[#121212] p-6 rounded-xl shadow-lg flex flex-row max-h-[200px] overflow-hidden mb-6 transition-all duration-300 ease-in-out">
      <Skeleton width={120} height={120} className="rounded-lg" baseColor="#1a1a1a" highlightColor="#2a2a2a" />
      <div className="pl-6 flex-1 flex flex-col justify-between">
        <div>
          <Skeleton width="80%" height={28} className="mb-3" baseColor="#1a1a1a" highlightColor="#2a2a2a" />
          <Skeleton width="60%" height={20} baseColor="#1a1a1a" highlightColor="#2a2a2a" />
        </div>
        <div className="flex items-center">
          <Skeleton circle width={40} height={40} className="mr-3" baseColor="#1a1a1a" highlightColor="#2a2a2a" />
          <Skeleton width={100} height={20} baseColor="#1a1a1a" highlightColor="#2a2a2a" />
        </div>
      </div>
    </div>
  );

  if (error) {
    return <div className="text-red-500">Error loading blogs: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-black">
      <div className="flex flex-col w-1/4 bg-[#000000] p-6">
        <div className="flex flex-col gap-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`p-3 rounded-lg text-left transition-all duration-300 ${
                selectedTab === tab.id
                  ? "bg-pink-500 text-black font-semibold shadow-lg"
                  : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.title}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="flex-1 px-8 pt-2 bg-black text-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full overflow-y-auto pr-4 custom-scrollbar pt-2"
          >
            <div className="main-content space-y-6">
              {selectedTab === "tab5" ? (
                <FormComponent />
              ) : isBlogsLoading || loading ? (
                Array(5).fill().map((_, index) => <BlogSkeleton key={index} />)
              ) : (
                tabs.find((tab) => tab.id === selectedTab).content.map((blog, index) => (
                  <motion.div
                    key={blog._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="w-full bg-[#121212] p-6 rounded-xl shadow-lg flex items-center space-x-6 cursor-pointer hover:bg-[#1a1a1a] transition-all duration-300 ease-in-out"
                    onClick={() => handleBlogClick(blog._id)}
                  >
                    <img src={blog.coverImageURL} alt="Cover" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 text-pink-400">{blog.title}</h2>
                      <p className="text-gray-400 mb-4 line-clamp-2">{blog.body || "No excerpt available"}</p>
                      <div className="flex items-center">
                        <img src={blog.createdBy.profileImage} alt={blog.createdBy.fullname} className="w-10 h-10 rounded-full mr-3 border-2 border-pink-500" />
                        <div>
                          <p className="font-semibold text-gray-300">{blog.createdBy.fullname}</p>
                          <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EditorialPage;