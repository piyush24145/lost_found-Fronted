import React, { useState } from "react";
import { FaUsers, FaList, FaCog, FaTachometerAlt } from "react-icons/fa";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Listings from "./Listings";
import Settings from "./Settings";

function AdminModule() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col fixed h-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">Admin Panel</h1>
        <ul className="space-y-2">
          <li
            className={`flex items-center p-2 rounded cursor-pointer ${
              activeTab === "dashboard" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaTachometerAlt className="mr-2" /> Dashboard
          </li>
          <li
            className={`flex items-center p-2 rounded cursor-pointer ${
              activeTab === "users" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers className="mr-2" /> Manage Users
          </li>
          <li
            className={`flex items-center p-2 rounded cursor-pointer ${
              activeTab === "listings" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("listings")}
          >
            <FaList className="mr-2" /> Manage Listings
          </li>
          <li
            className={`flex items-center p-2 rounded cursor-pointer ${
              activeTab === "settings" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog className="mr-2" /> Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Topbar */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-gray-900 sticky top-0 z-10">
          <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
          <div className="bg-gray-700 px-3 py-1 rounded">Khoja kya!!</div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "users" && <Users />}
          {activeTab === "listings" && <Listings />}
          {activeTab === "settings" && <Settings />}
        </div>

        {/* Footer */}
        <footer className="p-4 bg-gray-800 text-center text-gray-400 border-t border-gray-700">
          © {new Date().getFullYear()} Khoja Kya - Admin Panel
        </footer>
      </div>
    </div>
  );
}

export default AdminModule;
