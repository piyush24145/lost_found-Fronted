import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import ReportLostForm from "./pages/ReportLostForm";
import ReportFoundForm from "./pages/ReportFoundForm";
import Searchbar from "./pages/Searchbar";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Footer from "./components/Footer";
import Aboutus from "./pages/Aboutus";
import ProfilePage from "./pages/ProfilePage";
import EditProfileModal from "./pages/EditProfileModal";
import DetailsLost from "./pages/DetailsLost";
import DetailsFound from "./pages/DetailsFound";
import Herosection from "./components/Herosection";
import MatchedItems from "./pages/MatchedItems";
 import TermsOfUse from "./pages/termsOfUse";
import Privacy from "./pages/privacy";

const APP = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
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
          <Route path="/about" element={<Aboutus/>} />
         <Route path="/my-profile" element={<ProfilePage/>} />
         <Route path="/Edit-profile" element={<EditProfileModal/>} />
        <Route path="/item-detailsLost/:id" element={<DetailsLost/>} />
        <Route path="/item-detailsFound/:id" element={<DetailsFound/>} />
         <Route path="/hero-section" element={<Herosection/>} />
              <Route path="/terms-condition" element={<TermsOfUse/>} />

         <Route path="/privacy-policy" element={<Privacy/>} />


 <Route
            path="/match"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
               <MatchedItems/>
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
            path="/reportLost"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ReportLostForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reportFound"
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
        </Routes>
       
      </main>
     
     <Footer/>
    
    </>

  );
};

export default APP;
