import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../environment";


export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState(""); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  

  const fetchResults = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (typeFilter) params.append("type", typeFilter);

      const res = await fetch(`${baseUrl}/api/items/search?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch results");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchResults();
    }, 400);
    return () => clearTimeout(debounce);
  }, [query, typeFilter]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Search Lost & Found Items</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by title, description, location..."
          className="flex-grow border border-gray-300 rounded px-3 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="found">Found</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {loading && <p>Loading results...</p>}
      {!loading && results.length === 0 && <p>No items found.</p>}

      <ul>
        {results.map((item) => (
          <li
            key={item._id}
            className="border border-gray-200 rounded p-4 mb-3 flex space-x-4"
          >
            {item.images && item.images.length > 0 && (
              <img
                src={`${baseUrl}${item.images[0]}`}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm mt-1">
                <strong>Location:</strong> {item.location}
              </p>
              <p className="text-sm mt-1">
                <strong>Type:</strong>{" "}
                {item.type
                  ? item.type.charAt(0).toUpperCase() + item.type.slice(1)
                  : "N/A"}
              </p>
              <p className="text-sm mt-1">
                <strong>Contact:</strong> {item.contactNumber}{" "}
                {item.email && `| ${item.email}`}
              </p>

              <Link
                to={`/${item.type === "lost" ? "item-detailsLost" : "item-detailsFound"}/${item._id}`}
                className="text-blue-500 underline mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
