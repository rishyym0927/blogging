import React from "react";
import { motion } from "framer-motion";
import "./customcss1.css";

const BtnGroup1 = () => {
  return (
    <div className="box flex flex-col  gap-10 justify-right items-center relative">
      <motion.button
        className="btn w-60 h-16 text-2xl bg-black border-pink-500 text-white   hover:text-white hover:bg-black/90 hover:border-pink-500"
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
      >
     <a href="academics"> 😫 Academics</a>
      </motion.button>

      <motion.button
        className="btn w-60 h-16 text-2xl bg-black border-pink-500 text-white hover:text-white hover:bg-black/90 hover:border-pink-500  "
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
      >
      <a href="/editorials"> 😈 Editoirals</a>
      </motion.button>
      <motion.button
        className="btn w-60 h-16 text-2xl  bg-black border-pink-500 text-white hover:text-white hover:bg-black/90 hover:border-pink-500"
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
      ><a href="/epicshit">💩 EpicShit</a>
       
      </motion.button>
    </div>
  );
};

export default BtnGroup1;
