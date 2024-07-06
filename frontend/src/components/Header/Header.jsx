import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, setUser, fetchUserDetails } = useContext(UserContext);
  console.log("User context data:", user);

  const handleLogout = async () => {
    try {
      console.log("Initiating logout");
      const response = await axios.get("http://localhost:8001/user/signout", {
        withCredentials: true,
      });
      console.log("Logout response:", response);

      if (response.status === 200) {
        setUser(null); // Clear user state after logout
        toast.success("Logged out successfully");
        console.log("User logged out successfully");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div>
      <div className="drawer ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar pr-5 bg-black text-white h-20 opacity-100">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-6 mx-2 text-3xl font-bold">
              <Link to="/">PageSquare</Link>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {user && user._id ? (
                  <div
                   
                    className="text-white flex items-center space-x-4 flex-row opacity-100"
                  >
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 border-white border rounded-full overflow-hidden">
                        <img src={user.profileImage} alt="Profile" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">{user.fullname}</span>
                        <span className="text-xs">{user.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn bg-black text-white btn-md"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <button className="btn btn-xs sm:btn-sm md:btn-sm lg:btn-sm bg-white text-black hover:text-black hover:bg-white/90 hover:scale-105">
                      <Link to="/signin">Touch Me</Link>
                    </button>
                  </motion.li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 gap-4 text-xl w-80 min-h-full bg-gray-900 text-white flex justify-center items-center">
            {/* Sidebar content here */}
            <li>
              <Link>Sidebar Item 1</Link>
            </li>
            <li>
              <Link>Sidebar Item 2</Link>
            </li>
            <li>
              <Link>Sidebar Item 3</Link>
            </li>
            <li>
              <Link>Sidebar Item 4</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
