import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Herosection from "./components/Herosection";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import ReportLostForm from "./pages/ReportLostForm";
import ReportFoundForm from "./pages/ReportFoundForm";
import Searchbar from "./pages/Searchbar";
import Aboutus from "./pages/Aboutus";
import ProfilePage from "./pages/ProfilePage";
import EditProfileModal from "./pages/EditProfileModal";
import DetailsLost from "./pages/DetailsLost";
import DetailsFound from "./pages/DetailsFound";
import MatchedItems from "./pages/MatchedItems";
import Privacy from "./pages/Privacy";
import AdminModule from "./component/AdminModule";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import TermOfUse from "./pages/TermofUse";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let storedUser = null;

    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        storedUser = JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("Invalid user JSON in localStorage, clearing...", error);
      localStorage.removeItem("user"); 
    }

    setIsAuthenticated(!!token);
    setUser(storedUser);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Error parsing user JSON after login:", error);
      localStorage.removeItem("user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/my-profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfileModal />} />
          <Route path="/item-detailsLost/:id" element={<DetailsLost />} />
          <Route path="/item-detailsfound/:id" element={<DetailsFound />} />
          <Route path="/hero-section" element={<Herosection />} />
          <Route path="/terms-condition" element={<TermOfUse/>} />
          <Route path="/privacy-policy" element={<Privacy/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password/:token" element={<ResetPassword />} />


          {/* Protected routes (for authenticated users) */}
          <Route
            path="/match"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MatchedItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lost"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <LostItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/found"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <FoundItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reportlost"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ReportLostForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reportfound"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ReportFoundForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Searchbar />
              </ProtectedRoute>
            }
          />

          {/* ✅ Admin Routes (Only for admins) */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated && user?.role === "admin"}
              >
                <AdminModule />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
