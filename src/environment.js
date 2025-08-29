let baseUrl = "";

if (process.env.NODE_ENV === "production") {
  // ✅ Production (Vercel build ke liye)
  baseUrl = "https://lost-found-backend-5.onrender.com";
} else {
  // ✅ Development (local chalane ke liye)
  baseUrl = "http://localhost:5000";
}

export { baseUrl };
