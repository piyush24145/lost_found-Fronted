import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../environment";

const LostItems = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLostItems = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/items?type=lost`);
      if (!res.ok) throw new Error("Failed to fetch lost items");
      const data = await res.json();
      setLostItems(data);
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
      setError("Failed to load lost items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 font-semibold">
        Loading lost items...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (lostItems.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 font-semibold">
        No lost items found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Lost Items</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <img
              src={
                item.images && item.images.length > 0
                  ? item.images[0]   // ✅ FIXED
                  : "https://via.placeholder.com/150"
              }
              alt={item.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-sm text-gray-500 mt-2">📍 {item.location}</p>
            <p className="text-sm text-gray-400">
              🗓️ {new Date(item.date).toLocaleDateString()}
            </p>
            <Link to={`/item-detailsLost/${item._id}`}>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostItems;
