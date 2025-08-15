import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
   
      <div className="bg-black/40 backdrop-blur-md shadow-lg z-20">  
      </div>
      <div
        className="p-6 text-center flex flex-col items-center justify-center flex-1 relative"
        style={{
          backgroundImage:
            "url('/India5.jpg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to Lost & Found
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-2xl mx-auto">
            Find what you lost, reunite what you found!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/reportlost"
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out font-semibold"
            >
              Report a Lost Item
            </Link>
            <Link
              to="/reportFound"
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out font-semibold"
            >
              Report a Found Item
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
