import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../environment";

const ReportFoundForm = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    category: "",
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("type", "found");
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((img) => {
        data.append("images", img.file);
      });

      await axios.post(`${baseUrl}/api/items`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Found item reported successfully!");
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        category: "",
        title: "",
        description: "",
        location: "",
        date: "",
      });
      setImages([]);
      navigate("/found");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to report found item. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Report Found Item
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg p-8 rounded-xl border"
      >
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Your Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-semibold mb-1">Contact Number</label>
          <input
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            type="tel"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g. +91 9876543210"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email (Compulsory)</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter email address"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Item Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select category</option>
            <option>Wallet</option>
            <option>Mobile Phone</option>
            <option>Documents</option>
            <option>Jewellery</option>
            <option>Id-Card</option>
            <option>Notebook</option>
            <option>Watch</option>
            <option>Other</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Short title for found item"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="3"
            placeholder="Describe the found item in detail"
            required
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location Found</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            type="text"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Where did you find it?"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-semibold mb-1">Date Found</label>
          <input
            name="date"
            value={formData.date}
            onChange={handleChange}
            type="date"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Upload Images</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            className="block"
          />
          <div className="flex flex-wrap gap-4 mt-3">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-28 h-28 border rounded-lg overflow-hidden"
              >
                <img
                  src={img.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportFoundForm;
