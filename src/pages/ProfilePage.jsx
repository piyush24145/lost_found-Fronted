import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { Link } from "react-router-dom";
import { baseUrl } from "../environment";


const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${baseUrl}/api/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${profile?.name}&background=6C63FF&color=fff&bold=true`}
            alt="Avatar"
            className="w-24 h-24 rounded-full shadow-md border-4 border-white -mt-12"
          />
          <h1 className="text-2xl font-bold mt-4 text-gray-800">{profile?.name}</h1>
          <p className="text-gray-500">{profile?.email}</p>
<Link  to="/login">
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg shadow hover:opacity-90 transition-all"
          >
            Edit Profile
          </button>
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Name</span>
            <span className="text-gray-600">{profile?.name}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Email</span>
            <span className="text-gray-600">{profile?.email}</span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updatedProfile) => setProfile(updatedProfile)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
