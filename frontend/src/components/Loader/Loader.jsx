// Loader.js
import React from "react";
import { useLoader } from "../../contexts/loadContext";
import "./Loader.css"; // Ensure this path matches your structure
import Header from "../Header/Header";

const Loader = () => {
  const { loading } = useLoader();

  return (
    loading && (
      <>
        <div className="loaders">
          <div className="w-full">
            <Header />
          </div>
          <div className="h-full flex items-center justify-center">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Loader;
