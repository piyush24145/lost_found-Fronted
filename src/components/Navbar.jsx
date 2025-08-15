import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className=" px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:scale-105 transform transition duration-300"
        >
          <img
            src="INDIALogo.png" 
            alt="Khoja Kya Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-extrabold tracking-wide">
            Khoja Kya !!
          </span>
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-300 transition duration-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-300 transition duration-200">
            About Us
          </Link>
          <Link to="/lost" className="hover:text-yellow-300 transition duration-200">
            Lost Items
          </Link>
          <Link to="/found" className="hover:text-yellow-300 transition duration-200">
            Found Items
          </Link>
            <Link to="/match" className="hover:text-yellow-300 transition duration-200">
            Matched Items
          </Link>
          <Link to="/search" className="hover:text-yellow-300 transition duration-200">
            Search
          </Link>
          <Link to="/my-profile" className="hover:text-yellow-300 transition duration-200">
            My-profile
          </Link>
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-300 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-yellow-300 transition duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Sign Out
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
