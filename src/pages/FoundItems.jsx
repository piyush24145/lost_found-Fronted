import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../environment";

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoundItems = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/items?type=found`);
      if (!res.ok) throw new Error("Failed to fetch found items");
      const data = await res.json();
      setFoundItems(data.items || data); 
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFoundItems();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 font-semibold">
        Loading found items...
      </div>
    );
  }
  if (foundItems.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 font-semibold">
        No found items found.
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Found Items</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foundItems.map((item) => (
          <div
            key={item._id || item.id}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <img
              src={
                item.images && item.images.length > 0
                  ? `${baseUrl}${item.images[0]}`
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
            <Link to={`/item-detailsFound/${item._id}`}>
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
export default FoundItems;
