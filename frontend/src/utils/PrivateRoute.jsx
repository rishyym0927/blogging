import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
const PrivateRoute = () => {
  const { user, fetchUserDetails } = useContext(UserContext); // Assuming you have a fetchUser function in UserContext
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserDetails(); // Assuming fetchUser is an async function that fetches the user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Current user:", user);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any loading indicator
  }

  return user._id !== undefined ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
