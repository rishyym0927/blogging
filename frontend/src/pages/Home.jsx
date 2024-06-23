import React, { useContext } from "react";

import Header from "../components/Header/Header";

import Typer from "../components/Typewriter/Typer";
import BtnGroup1 from "../components/BtnGroup1/BtnGroup1";
import Footer from "../components/Footer/Footer";

const Home = () => {
  
  return (
    <>
    <div className="App bg-black min-h-[100vh]">
    
      <div className="md:flex md:items-center ">
        {" "}
        <div className="min-h-[400px] md:h-[520px] md:w-4/6  flex items-center pl-10">
          <Typer />
        </div>
        <div className="w-full p-6 md:w-2/6 h-auto md:min-h-[520px] flex md:items-center md:justify-end md:pr-14 ">
          <BtnGroup1 />
        </div>
      </div>
     
    </div>

     </>
  );
};

export default Home;
