import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../environment"; 

const DetailsLost = () => {
  const { id } = useParams(); 
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/items/${id}`);
        const data = await res.json();
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  if (!item) {
    return <div className="text-center py-10 text-lg text-red-500">Item not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/lost"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Lost Items
      </Link>
      {item.images && item.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {item.images.map((img, idx) => (
            <img
              key={idx}
              src={`${baseUrl}${img}`}
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg shadow"
            />
          ))}
        </div>
      )}

      {/* Details */}
      <h1 className="text-3xl font-bold mb-4 capitalize">{item.title}</h1>
      <p className="mb-4 text-gray-700">{item.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg shadow">
        <div>
          <p><span className="font-semibold">Category:</span> {item.category}</p>
          <p><span className="font-semibold">Location:</span> {item.location}</p>
          <p><span className="font-semibold">Date:</span> {new Date(item.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p><span className="font-semibold">Reported By:</span> {item.name}</p>
          <p><span className="font-semibold">Contact Number:</span> {item.contactNumber}</p>
          {item.email && (
            <p><span className="font-semibold">Email:</span> {item.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsLost;
