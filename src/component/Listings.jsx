import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../environment";
import { FaTrash } from "react-icons/fa";

function Listings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/items`);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${baseUrl}/api/admin/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const verifyItem = async () => {
    if (!selectedItem) return;
    try {
      await axios.put(`${baseUrl}/api/items/verify/${selectedItem._id}`);
      alert("✅ Item Verified and moved to Dashboard!");

      setItems((prev) =>
        prev.map((item) =>
          item._id === selectedItem._id ? { ...item, verified: true } : item
        )
      );

      setShowPopup(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Verify failed:", error);
    }
  };

  const filteredItems = items.filter((item) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      (item.title?.toLowerCase() || "").includes(searchTerm) ||
      (item.name?.toLowerCase() || "").includes(searchTerm) ||
      (item.category?.toLowerCase() || "").includes(searchTerm) ||
      (item.email?.toLowerCase() || "").includes(searchTerm);

    const matchesFilter = filter === "all" ? true : item.type === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="bg-gray-800 p-4 rounded shadow text-white">
        Loading items...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-4 rounded shadow text-white h-full flex flex-col">
      <h3 className="text-lg font-bold mb-3">Manage Listings</h3>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-2 mb-3">
        <input
          type="text"
          placeholder="Search listings..."
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white w-full md:w-40"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="found">Found</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* 🖥 Desktop Table */}
      <div className="hidden md:block flex-1 overflow-y-auto border border-gray-700 rounded">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-700 sticky top-0 z-10">
              <tr>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Date & Time</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Contact</th>
                <th className="p-2 text-left">Image</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-2">{item.email || "N/A"}</td>
                  <td className="p-2">{item.name || "N/A"}</td>
                  <td className="p-2">{item.category || "N/A"}</td>
                  <td className="p-2">{item.description || "N/A"}</td>
                  <td className="p-2">
                    {item.date ? new Date(item.date).toLocaleString() : "N/A"}
                  </td>
                  <td className="p-2">{item.location || "N/A"}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.type === "found" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="p-2">{item.contactNumber || "N/A"}</td>
                  <td className="p-2">
                    {item.images && item.images.length > 0 ? (
                  <img
  src={
    item.images && item.images.length > 0
      ? `${baseUrl}${
          item.images[0].startsWith("/uploads")
            ? item.images[0]
            : "/uploads/" + item.images[0]
        }`
      : "https://via.placeholder.com/150"
  }
  alt="item"
  className="h-14 w-14 object-cover rounded"
/>

                    ) : (
                      "No Img"
                    )}
                  </td>
                  <td className="p-2 flex gap-2 items-center">
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                    {!item.verified && (
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowPopup(true);
                        }}
                        className="px-3 py-1 bg-green-600 rounded text-white hover:bg-green-700 text-xs"
                      >
                        Verify
                      </button>
                    )}
                    {item.verified && (
                      <span className="text-green-400 font-semibold text-xs">
                        Verified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📱 Mobile Card View */}
      <div className="md:hidden flex-1 overflow-y-auto space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 p-3 rounded-lg border border-gray-700"
          >
            <div className="flex gap-3">
              {item.images && item.images.length > 0 ? (
               <img
  src={
    item.images && item.images.length > 0
      ? `${baseUrl}${
          item.images[0].startsWith("/uploads")
            ? item.images[0]
            : "/uploads/" + item.images[0]
        }`
      : "https://via.placeholder.com/150"
  }
  alt="item"
  className="h-20 w-20 object-cover rounded"
/>

              ) : (
                <div className="h-20 w-20 bg-gray-600 flex items-center justify-center text-xs text-gray-300">
                  No Img
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-bold">{item.name || "Unnamed"}</h4>
                <p className="text-sm text-gray-400">{item.category}</p>
                <p className="text-xs text-gray-500">
                  {item.date ? new Date(item.date).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm">{item.description}</p>
            <p className="text-sm text-gray-400">📍 {item.location}</p>
            <p className="text-sm text-gray-400">☎ {item.contactNumber}</p>

            <div className="flex justify-between items-center mt-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  item.type === "found" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {item.type}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteItem(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                {!item.verified && (
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowPopup(true);
                    }}
                    className="px-2 py-1 bg-green-600 rounded text-white text-xs"
                  >
                    Verify
                  </button>
                )}
                {item.verified && (
                  <span className="text-green-400 font-semibold text-xs">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Popup */}
      {showPopup && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-80 text-black shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Kya aap is item ko verify karna chahte ho?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={verifyItem}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listings;

