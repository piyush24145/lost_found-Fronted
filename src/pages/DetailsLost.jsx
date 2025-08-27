// src/pages/FoundDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../environment";

export default function DetailsLost() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Failed to load item details");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!item) return <p className="text-center mt-10">Item not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {item.type} Item Details
      </h2>

      {/* Images */}
      {item.images && item.images.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6">
          {item.images.map((img, index) => (
            <img
              key={index}
              src={`${baseUrl}${img}`} // ✅ backend me /uploads serve ho rha
              alt="Item"
              className="w-40 h-40 object-cover rounded-lg border"
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            />
          ))}
        </div>
      )}

      {/* Info */}
      <div className="space-y-3">
        <p><strong>Title:</strong> {item.title}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>

        {/* Contact */}
        <h3 className="text-xl font-semibold mt-4">Contact Details</h3>
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Email:</strong> {item.email}</p>
        <p><strong>Contact Number:</strong> {item.contactNumber}</p>
      </div>

    </div>)}