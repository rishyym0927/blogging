import React from "react";  // Ensure React is imported
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BlogProvider>
    <UserProvider>
    <BrowserRouter>
    <Header />
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
    </UserProvider>
    </BlogProvider>
  );
}

export default App;
