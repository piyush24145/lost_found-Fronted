import React, { useState } from "react";
import {
  FaUsers,
  FaList,
  FaCog,
  FaTachometerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Listings from "./Listings";
import Settings from "./Settings";

function AdminModule() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-gray-800 p-4 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-400 hidden md:block">
            Admin Panel
          </h1>
          {/* Mobile Close Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Menu */}
        <ul className="space-y-1">
          <li
            className={`flex items-center px-3 py-2 rounded cursor-pointer whitespace-nowrap ${
              activeTab === "dashboard" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("dashboard");
              setSidebarOpen(false);
            }}
          >
            <FaTachometerAlt className="mr-2 shrink-0" /> <span>Dashboard</span>
          </li>
          <li
            className={`flex items-center px-3 py-2 rounded cursor-pointer whitespace-nowrap ${
              activeTab === "users" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("users");
              setSidebarOpen(false);
            }}
          >
            <FaUsers className="mr-2 shrink-0" /> <span>Manage Users</span>
          </li>
          <li
            className={`flex items-center px-3 py-2 rounded cursor-pointer whitespace-nowrap ${
              activeTab === "listings" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("listings");
              setSidebarOpen(false);
            }}
          >
            <FaList className="mr-2 shrink-0" /> <span>Manage Listings</span>
          </li>
          <li
            className={`flex items-center px-3 py-2 rounded cursor-pointer whitespace-nowrap ${
              activeTab === "settings" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("settings");
              setSidebarOpen(false);
            }}
          >
            <FaCog className="mr-2 shrink-0" /> <span>Settings</span>
          </li>
        </ul>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Topbar */}
        {!sidebarOpen && (
          <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900 sticky top-0 z-10">
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden text-gray-400 hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <FaBars size={20} />
              </button>
              <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded text-sm">
              Khoja kya!!
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "users" && <Users />}
          {activeTab === "listings" && <Listings />}
          {activeTab === "settings" && <Settings />}
        </div>

        {/* Footer */}
        <footer className="p-4 bg-gray-800 text-center text-gray-400 border-t border-gray-700 text-sm">
          © {new Date().getFullYear()} Khoja Kya - Admin Panel
        </footer>
      </div>
    </div>
  );
}

export default AdminModule;
