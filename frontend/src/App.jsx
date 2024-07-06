// App.js
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivateRoute from "./utils/PrivateRoute";
import Academics from "./pages/Academics";
import Editorials from "./pages/Editorials";
import Epicshit from "./pages/Epicshit";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BlogProvider } from "./contexts/BlogContext";
import { LoaderProvider, useLoader } from "./contexts/loadContext";
import Loader from "./components/Loader/Loader";

const RouteChangeHandler = () => {
  const { setLoading } = useLoader();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1300); // Simulating a delay for the loader

    return () => clearTimeout(timeoutId);
  }, [location, setLoading]);

  return null;
};

function App() {
  return (
    <BlogProvider>
      <UserProvider>
        <LoaderProvider>
          <BrowserRouter>
            <Header />
            <Loader />
            <RouteChangeHandler />  {/* This component handles route changes and shows a loader */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<PrivateRoute />}>
                <Route path="/academics" element={<Academics />} />
                <Route path="/editorials" element={<Editorials />} />
                <Route path="/epicshit" element={<Epicshit />} />
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </LoaderProvider>
      </UserProvider>
    </BlogProvider>
  );
}

export default App;
