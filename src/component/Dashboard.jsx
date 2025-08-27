import React, { useEffect, useState } from "react";
import { baseUrl } from "../environment";
import { FaTrash, FaPaperPlane } from "react-icons/fa";

// ✅ Email Modal Component
function EmailModal({ isOpen, onClose, recipient }) {
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
    alert(data.msg); // ✅ fixed (backend se "msg" aa raha hai)
    onClose();
  } catch (err) {
    alert("❌ Failed to send email!");
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
          placeholder="Recipient Email"
          value={formData.to}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded text-black"
          readOnly // ✅ recipient auto-filled
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

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/items`);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`${baseUrl}/api/items/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item!");
    }
  };

  const handleEmail = (email) => {
    if (!email) {
      alert("No email available for this user!");
      return;
    }
    setSelectedEmail(email);
    setShowModal(true);
  };

  const verifiedItems = items.filter((item) => item?.verified);

  const totalReports = items.length;
  const resolvedCases = verifiedItems.length;
  const pendingCases = totalReports - resolvedCases;

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 text-white max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Welcome Back2u</h2>

      {/* ✅ Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow text-center">
          <h3 className="text-lg">Total Reports</h3>
          <p className="text-2xl font-bold text-blue-400">{totalReports}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow text-center border-2 border-green-500">
          <h3 className="text-lg">Resolved Cases</h3>
          <p className="text-2xl font-bold text-green-400">{resolvedCases}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow text-center">
          <h3 className="text-lg">Pending Reports</h3>
          <p className="text-2xl font-bold text-red-500">{pendingCases}</p>
        </div>
      </div>

      {/* ✅ Verified Items Table */}
      <div className="bg-gray-800 p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Verified Reports</h3>
        <div className="overflow-y-auto max-h-[50vh] border border-gray-700 rounded">
          <table className="w-full border-collapse">
            <thead className="bg-blue-700 sticky top-0">
              <tr>
                <th className="border border-gray-700 p-2">ID</th>
                <th className="border border-gray-700 p-2">User</th>
                <th className="border border-gray-700 p-2">Item</th>
                <th className="border border-gray-700 p-2">Status</th>
                <th className="border border-gray-700 p-2">Verification Date</th>
                <th className="border border-gray-700 p-2">Actions</th>
                <th className="border border-gray-700 p-2">Mail</th>
              </tr>
            </thead>
            <tbody>
              {verifiedItems.length > 0 ? (
                verifiedItems.map((item) => (
                  <tr key={item._id} className="text-center">
                    <td className="border border-gray-700 p-2">{item._id}</td>
                    <td className="border border-gray-700 p-2">
                      {item?.name || "-"}
                    </td>
                    <td className="border border-gray-700 p-2">
                      {item?.category || "-"}
                    </td>
                    <td className="border border-gray-700 p-2">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          item?.type === "lost" ? "bg-red-600" : "bg-green-600"
                        }`}
                      >
                        {item?.type}
                      </span>
                    </td>
                    <td className="border border-gray-700 p-2">
                      {item?.verifiedAt
                        ? new Date(item.verifiedAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="border border-gray-700 p-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        <FaTrash />
                      </button>
                    </td>
                    <td className="border border-gray-700 p-2">
                      <button
                        onClick={() => handleEmail(item?.email)}
                        className="text-blue-400 hover:text-blue-600 text-xl"
                      >
                        <FaPaperPlane />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-400">
                    No verified reports yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Email Modal */}
      <EmailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        recipient={selectedEmail}
      />
    </div>
  );
}
