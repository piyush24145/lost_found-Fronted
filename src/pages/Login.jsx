import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../environment";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

   
      localStorage.setItem("token", data.token);

     
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          profilePic: data.profilePic || null,
        })
      );

      if (onLogin) onLogin();

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
    
      <div className="flex flex-1">
     
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-200">
          <img
            src="/6593bae1-d742-4d01-86c5-d6be4738ef55 (1).png" 
            alt="Lost & Found Illustration"
            className="h-full w-full object-cover"
          />
        </div>

     
        <div className="flex w-full md:w-1/2 justify-center items-center bg-gradient-to-r from-yellow-50 to-green-50 p-8">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="User Name"
                className="w-full px-4 py-2 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </form>

            <div className="flex justify-between items-center mt-4 text-sm">
             <Link to={"/register"}><button
                type="button"
                className="text-gray-500 hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button></Link> 
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forget Password ?
              </button>
            </div>
          </div>
        </div>
      </div>

   
      <footer className="bg-gray-100 py-6 px-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <div className="mb-4 md:mb-0">
          <p className="font-semibold">Help</p>
          <p>Customer Support</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <p>Tel: +91 8340168796</p>
          <p>Email: piyushkumar04136@gmail.com</p>
          <div className="flex space-x-4 mt-2">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </footer>
    </div>
  );
}
