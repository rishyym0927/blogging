import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8001/user/signout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(null);
        toast.success("Logged out successfully");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <div className="drawer-content flex flex-col">
        <header className="bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <Link to="/" className="text-3xl font-bold">PageSquare</Link>
              
              <div className="hidden md:flex items-center space-x-4">
                {user && user._id ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 border-2 border-white rounded-full overflow-hidden">
                        <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold">{user.fullname}</p>
                        <p className="text-xs text-gray-300">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline btn-sm text-white hover:bg-white hover:text-black transition duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link to="/signin" className="btn btn-sm bg-white text-black hover:bg-white/90 hover:scale-105 transition duration-300">
                      Touch Me
                    </Link>
                  </motion.div>
                )}
              </div>
              <div className="md:hidden">
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-gray-900 text-white">
          <li><Link className="text-xl py-3" onClick={() => setIsDrawerOpen(false)}>Sidebar Item 1</Link></li>
          <li><Link className="text-xl py-3" onClick={() => setIsDrawerOpen(false)}>Sidebar Item 2</Link></li>
          <li><Link className="text-xl py-3" onClick={() => setIsDrawerOpen(false)}>Sidebar Item 3</Link></li>
          <li><Link className="text-xl py-3" onClick={() => setIsDrawerOpen(false)}>Sidebar Item 4</Link></li>
          {user && user._id && (
            <li>
              <button onClick={() => { handleLogout(); setIsDrawerOpen(false); }} className="text-xl py-3 text-red-400">Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;