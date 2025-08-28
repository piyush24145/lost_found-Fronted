import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Transparent White Navbar */}
      <div className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
 
      </div>

      {/* ✅ Background Image Section */}
      <div
        className="p-6 text-center flex flex-col items-center justify-center flex-1 relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/fe5b3a24-3706-472f-990b-667aad848513.png')", // 👈 apna image path yaha dal
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to Lost & Found
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-2xl mx-auto">
            Find what you lost, reunite what you found!
          </p>

          {/* Buttons */}
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

      {/* ✅ College Numbers Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Our College in Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-4xl font-extrabold text-indigo-600">200+</h3>
              <p className="mt-2 text-gray-600">Lost Items Reported</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-4xl font-extrabold text-green-600">100+</h3>
              <p className="mt-2 text-gray-600">Items Returned</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-4xl font-extrabold text-red-600">90%</h3>
              <p className="mt-2 text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
