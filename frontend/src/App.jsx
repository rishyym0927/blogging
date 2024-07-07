// App.js
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Academics from "./pages/Academics";
import Editorials from "./pages/Editorials";
import Epicshit from "./pages/Epicshit";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BlogProvider } from "./contexts/BlogContext";
import { LoaderProvider, useLoader } from "./contexts/loadContext";
import Loader from "./components/Loader/Loader";

import Cookies from "js-cookie";
import BlogComponent from "./components/BlogComponent/BlogComponent";

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

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <BlogProvider>
      <UserProvider>
        <LoaderProvider>
          <BrowserRouter>
            <Header />
            <Loader />
            <RouteChangeHandler />
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />

              <Route
                path="/editorials"
                element={
                  <ProtectedRoute>
                    <Editorials />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editorials/:id"
                element={
                  <ProtectedRoute>
                    <BlogComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/academics"
                element={
                  <ProtectedRoute>
                    <Academics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/epicshit"
                element={
                  <ProtectedRoute>
                    <Epicshit />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </LoaderProvider>
      </UserProvider>
    </BlogProvider>
  );
}

export default App;
