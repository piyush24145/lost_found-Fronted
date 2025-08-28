import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ isAuthenticated, isAdmin, onLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    onLogout();
    navigate("/login");
    setOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="px-6 py-4 shadow-md bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* ✅ Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:scale-105 transform transition duration-300"
        >
          <img
            src="/image.png"
            alt="Khoja Kya Logo"
            className="h-12 w-10 object-contain"
          />
         <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-green-600 via-red-600 to-yellow-700 bg-clip-text text-transparent drop-shadow-md">
  Khoja Kya !!
</span>

        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
          <Link to="/" className="hover:text-yellow-500 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-500 transition">About Us</Link>
          <Link to="/lost" className="hover:text-yellow-500 transition">Lost Items</Link>
          <Link to="/found" className="hover:text-yellow-500 transition">Found Items</Link>
          <Link to="/match" className="hover:text-yellow-500 transition">Matched Items</Link>
          <Link to="/search" className="hover:text-yellow-500 transition">Search</Link>

          {/* ✅ If user authenticated */}
          {isAuthenticated ? (
            <div className="relative">
              {/* Avatar Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none rounded-full border-2 border-yellow-400"
              >
                <img
                  src="https://i.pravatar.cc/40"
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full"
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 shadow-lg rounded-md py-2 z-50 border backdrop-blur-md">
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/Admin"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Admin
                  </Link>

                  {/* Admin Only */}
                  {isAdmin && (
                    <>
                      <Link
                        to="/admin/manage-listings"
                        className="block px-4 py-2 hover:bg-gray-100 text-red-500"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Manage Listings
                      </Link>
                      <Link
                        to="/admin/manage-users"
                        className="block px-4 py-2 hover:bg-gray-100 text-red-500"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Manage Users
                      </Link>
                      <Link
                        to="/admin/settings"
                        className="block px-4 py-2 hover:bg-gray-100 text-red-500"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                    </>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-500 transition">Login</Link>
              <Link to="/register" className="hover:text-yellow-500 transition">Register</Link>
            </>
          )}
        </div>

        {/* ✅ Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="focus:outline-none text-gray-800">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Side Drawer */}
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
          <Link to="/History-claimed" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>History</Link>

          {isAuthenticated ? (
            <>
              <Link to="/my-profile" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Your Profile</Link>
              <Link to="/Admin" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Admin</Link>

              <button
                onClick={handleSignOut}
                className="w-full bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" className="block text-white text-lg hover:text-yellow-300" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
