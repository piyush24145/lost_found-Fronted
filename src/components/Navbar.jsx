import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    onLogout();
    navigate("/login");
    setOpen(false);
  };

  return (
    <nav className="px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
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

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-300 transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 transition duration-200">About Us</Link>
          <Link to="/lost" className="hover:text-yellow-300 transition duration-200">Lost Items</Link>
          <Link to="/found" className="hover:text-yellow-300 transition duration-200">Found Items</Link>
          <Link to="/match" className="hover:text-yellow-300 transition duration-200">Matched Items</Link>
          <Link to="/search" className="hover:text-yellow-300 transition duration-200">Search</Link>
          <Link to="/my-profile" className="hover:text-yellow-300 transition duration-200">My-profile</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition duration-200">Login</Link>
              <Link to="/register" className="hover:text-yellow-300 transition duration-200">Register</Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 text-white"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="focus:outline-none"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      {open && (
        <div className="md:hidden bg-black/90 fixed top-0 left-0 h-full w-64 p-6 space-y-6 z-40">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X size={28} />
          </button>

          <Link to="/" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>About Us</Link>
          <Link to="/lost" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Lost Items</Link>
          <Link to="/found" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Found Items</Link>
          <Link to="/match" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Matched Items</Link>
          <Link to="/search" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Search</Link>
          <Link to="/my-profile" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>My-profile</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Register</Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="w-full bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 text-white"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
