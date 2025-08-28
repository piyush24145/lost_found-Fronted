import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../environment";
import { FaTrash } from "react-icons/fa";

function Listings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null); // ✅ store which item to verify
  const [showPopup, setShowPopup] = useState(false); // ✅ popup state

  // ✅ Fetch items
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

// ✅ Delete Item (Admin Panel)
const deleteItem = async (id) => {
  if (!window.confirm("Are you sure you want to delete this item?")) return;
  try {
    await axios.delete(`${baseUrl}/api/admin/items/${id}`); // 👈 correct route
    setItems(items.filter((item) => item._id !== id));
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Delete failed");
  }
};


  // ✅ Verify Item (after Yes in popup)
  const verifyItem = async () => {
    if (!selectedItem) return;
    try {
      await axios.put(`${baseUrl}/api/items/verify/${selectedItem._id}`);
      alert("✅ Item Verified and moved to Dashboard!");

      // ✅ Local state update
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

  // ✅ Filter + Search
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
      <div className="bg-gray-800 p-6 rounded shadow text-white">
        Loading items...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded shadow text-white h-[80vh] flex flex-col">
      <h3 className="text-lg font-bold mb-4">Manage Listings</h3>

      {/* 🔍 Search & Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search listings..."
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="found">Found</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* 📋 Table */}
      <div className="flex-1 overflow-y-auto border border-gray-700 rounded">
        <table className="min-w-full">
          <thead className="bg-gray-700 sticky top-0 z-10">
            <tr>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">User Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Date & Time</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Contact Info</th>
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
                    className={`px-2 py-1 rounded text-sm ${
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
                      src={`${baseUrl}${item.images[0]}`} // ✅ Corrected path (already saved with /uploads in backend)
                      alt="item"
                      className="h-16 w-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="p-2 flex gap-2 items-center">
                  {/* ❌ Delete Button */}
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>

                  {/* ✅ Verify Button (disabled if already verified) */}
                  {!item.verified && (
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowPopup(true);
                      }}
                      className="px-3 py-1 bg-green-600 rounded text-white hover:bg-green-700"
                    >
                      Verify
                    </button>
                  )}
                  {item.verified && (
                    <span className="text-green-400 font-semibold">
                      Verified
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Popup Modal */}
      {showPopup && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-96 text-black shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Kya aap <span className="font-bold">{selectedItem.name}</span> ko
              verify karna chahte ho?
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
