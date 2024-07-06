import React from "react";
import { motion } from "framer-motion";
import "./customcss1.css";
import { Link } from "react-router-dom";

const BtnGroup1 = () => {
  return (
    <div className="box flex flex-col  gap-10 justify-right items-center relative">
      <motion.button
        className="btn w-60 h-16 text-2xl bg-black border-pink-500 text-white   hover:text-white hover:bg-black/90 hover:border-pink-500"
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
      >
        <Link to="/academics"> 😫 Academics</Link>
      </motion.button>

      <motion.button
        className="btn w-60 h-16 text-2xl bg-black border-pink-500 text-white hover:text-white hover:bg-black/90 hover:border-pink-500  "
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
      >
        <Link to="/editorials"> 😈 Editoirals</Link>
      </motion.button>
      <motion.button
        className="btn w-60 h-16 text-2xl  bg-black border-pink-500 text-white hover:text-white hover:bg-black/90 hover:border-pink-500"
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
      >
        <Link to="/epicshit">💩 EpicShit</Link>
      </motion.button>
    </div>
  );
};

export default BtnGroup1;
