import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../environment";

export default function EditProfileModal({ isOpen, onClose, profile, onUpdate }) {
  const [preview, setPreview] = useState(profile.profilePic || "");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: profile.name || "",
      email: profile.email || "",
      profilePic: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      if (values.profilePic) formData.append("profilePic", values.profilePic);

      try {
        const token = localStorage.getItem("token");
        if (!token) return setError("Please login again.");

        const res = await fetch(`${baseUrl}/api/users/profile`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await res.json();
        if (res.ok) {
          onUpdate(data);
          onClose();
        } else {
          setError(data.message || "Failed to update profile");
        }
      } catch (err) {
        setError(err.message);
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md z-10">
          <Dialog.Title className="text-xl font-semibold mb-4 text-gray-800">
            Edit Profile
          </Dialog.Title>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <img
                src={preview || "/default-avatar.png"}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border shadow-sm"
              />
              <label className="mt-3 cursor-pointer px-3 py-1 text-sm text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    formik.setFieldValue("profilePic", file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setPreview(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              {formik.errors.name && <p className="text-red-500 text-xs">{formik.errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              {formik.errors.email && <p className="text-red-500 text-xs">{formik.errors.email}</p>}
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
