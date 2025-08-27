import React, { useState, useEffect } from "react";
import { baseUrl } from "../environment";

export default function EmailModal({ isOpen, onClose, recipient }) {
  const [formData, setFormData] = useState({
    to: recipient || "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, to: recipient || "" }));
  }, [recipient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
      onClose();
    } catch (err) {
      alert("Failed to send email!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
        <h2 className="text-lg font-semibold mb-4 text-black">Send Email</h2>
        <input
          type="email"
          name="to"
          value={formData.to}
          readOnly
          className="border w-full p-2 mb-3 rounded text-black"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded text-black"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded text-black"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={sendEmail}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
