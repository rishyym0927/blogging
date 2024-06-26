// src/components/EditorialPage.jsx

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import "daisyui/dist/full.css";
import { BlogContext } from "../contexts/BlogContext";

const tabs = [
  { id: "tab1", title: "Tab 1", content: [] },
  { id: "tab2", title: "Tab 2", content: [] },
  { id: "tab3", title: "Tab 3", content: [] },
  { id: "tab4", title: "Tab 4", content: [] },
  { id: "tab5", title: "Tab 5", content: [] },
];

const EditorialPage = () => {
  const { blogs } = useContext(BlogContext);

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tabId, tab) => {
    tab.content = [...blogs];
    setLoading(true);
    setTimeout(() => {
      setSelectedTab(tabId);
      setLoading(false);
    }, 500); // simulate loading time
  };
  
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/4 bg-black p-4">
        <div className="flex flex-col w-full h-full gap-6 justify-center items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id, tab)}
              className={`p-2 rounded-lg w-5/6 h-12 ${
                selectedTab === tab.id
                  ? "bg-pink-500 text-black font-bold"
                  : "bg-black border-white border text-white"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 bg-black text-white  ">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader ease-linear rounded-full  h-12 w-12"></div>
          </div>
        ) : (
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className=" p-3 h-full addScroll overflow-y-auto custom-scroll overflow-x-hidden"
          >
            <div className="main-content flex flex-col items-center gap-4">
              {tabs.find((tab) => tab.id === selectedTab).content.map((blog, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 0.99 }}
                  className="w-[100%] bg-[#212121] p-4 rounded-lg shadow-lg cursor-pointer  flex flex-row max-h-[200px] overflow-hidden"
                  onClick={() => window.location.href = `/blogs/${blog._id}`}
                >
                  <img src={blog.coverImageURL} width={70} height={70}  alt="Cover" className=" border rounded-lg h-28 w-1/4 "/>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                    <div className="flex items-center mt-4">
                      <img src={blog.createdBy.profileImage} alt="A" className="h-10 w-10 border rounded-full mr-2"/>
                      <div>
                        <p className="text-gray-300">{blog.createdBy.fullname}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EditorialPage;
