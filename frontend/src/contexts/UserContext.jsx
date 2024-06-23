import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null or {}

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8001/user", {
        withCredentials: true,
      });

      if (response.status === 200) {
        const userData = response.data;
        console.log("User data:", userData._id);
        setUser({
          _id: userData._id,
          fullname: userData.fullname,
          email: userData.email,
          profileImage: userData.profileImage,
          role: userData.role,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
        });
      } else {
        setUser(null);
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    console.log("User data:", user); // Log whenever user changes
  }, [user]);

  // Trigger fetchUserDetails on component mount or other condition
  useEffect(() => {
    fetchUserDetails();
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
