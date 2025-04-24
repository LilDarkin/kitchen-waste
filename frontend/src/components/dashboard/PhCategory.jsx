import React, { useEffect, useState } from "react";
import axios from "axios";

// Function to determine pH category
function getPHCategory(ph) {
  if (ph >= 4.4 && ph <= 5.5) return "Strongly Acidic";
  if (ph > 5.5 && ph <= 6.0) return "Moderately Acidic";
  if (ph > 6.0 && ph <= 6.6) return "Slightly Acidic";
  if (ph > 6.6 && ph <= 7.2) return "Near Neutral";
  if (ph > 7.2 && ph <= 7.8) return "Slightly Alkaline";
  if (ph > 7.8 && ph <= 8.4) return "Moderately Alkaline";
  if (ph > 8.4 && ph <= 9.0) return "Strongly Alkaline";
  return "Uncategorized";
}

const PhCategory = ({ className }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // To track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.76.112:8080/api/influx/latest");
        if (res.data.status === "success" && res.data.data) {
          const parsed = {};
          res.data.data.forEach(item => {
            parsed[item.field] = item.value;
          });
          setData(parsed);
        } else {
          setError("Invalid data received.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Error fetching data from the server: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 180000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const ph = data.phAvg ?? null;
  const category = ph !== null ? getPHCategory(ph) : "Data not available";

  return (
    <div className={`bg-green-100 p-4 rounded-2xl shadow-md text-gray-800 ${className}`}>
      <h3 className="font-bold text-xl mb-2">Soil pH Level</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600 font-bold whitespace-pre-wrap">{error}</p>
      ) : (
        <div className="text-lg">
          <p>🧪 pH Value: <span className="font-semibold">{ph !== null ? ph.toFixed(2) : "N/A"}</span></p>
          <p>🧩 Category: <span className="font-semibold">{category}</span></p>
        </div>
      )}
    </div>
  );
};

export default PhCategory;
