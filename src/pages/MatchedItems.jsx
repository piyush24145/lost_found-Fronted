import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../environment";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MatchedItems() {
  const [items, setItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isLocationMatch = (loc1, loc2) => {
    const a = loc1.toLowerCase();
    const b = loc2.toLowerCase();
    return a.includes(b) || b.includes(a);
  };

  const isTitleMatch = (title1, title2) => {
    const a = title1.toLowerCase();
    const b = title2.toLowerCase();
    return a.includes(b) || b.includes(a);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/items`);
        setItems(res.data);
        const matches = [];
        for (let i = 0; i < res.data.length; i++) {
          for (let j = i + 1; j < res.data.length; j++) {
            const item1 = res.data[i];
            const item2 = res.data[j];

            if (
              item1.type !== item2.type &&
              isLocationMatch(item1.location, item2.location) &&
              isTitleMatch(item1.title, item2.title)
            ) {
              matches.push({
                ...item1,
                matchedWith: item2,
                matchReason: "Title & Location fuzzy match",
              });
            }
          }
        }

        setMatchedItems(matches);
      } catch (error) {
        console.error("❌ Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        Loading matched items...
      </p>
    );
  if (matchedItems.length === 0)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        No matched items found.
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        🔗 Matched Items
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {matchedItems.map((item, index) => (
          <div
            key={`${item._id}-parent-${index}`}  // ✅ unique key for parent
            className="border border-gray-200 rounded-xl shadow-lg p-5 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Category:</strong> {item.category}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {item.location}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Type:</strong> {item.type?.toUpperCase()}
            </p>
            <p className="text-green-600 font-medium mb-4">
              ✅ {item.matchReason}
            </p>

            {item.matchedWith && (
              <div
                key={`${item.matchedWith._id}-child-${index}`} // ✅ unique key for child
                className="mt-3 p-3 border-t border-gray-200 bg-indigo-50 rounded-lg"
              >
                <h4 className="font-semibold text-indigo-800 mb-2">
                  Matched With
                </h4>
                <p className="text-gray-700 mb-1">
                  <strong>Title:</strong> {item.matchedWith.title}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Type:</strong> {item.matchedWith.type}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Location:</strong> {item.matchedWith.location}
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Category:</strong> {item.matchedWith.category}
                </p>
                <Link to={`/item-detailsFound/${item._id}`}>
                  <button
                    onClick={() => navigate(`/item/${item.matchedWith._id}`)}
                    className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                  >
                    Know About Founder
                  </button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
