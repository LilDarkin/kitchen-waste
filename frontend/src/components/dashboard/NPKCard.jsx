import React, { useEffect, useState } from "react";
import axios from "axios";

const NPKCard = ({ className }) => {
  const [npkData, setNpkData] = useState({ nAvg: 0, pAvg: 0, kAvg: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNPK = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get("http://192.168.165.112:8000/api/influx/latest");

        if (res.data?.status === "success" && Array.isArray(res.data.data)) {
          const parsed = {};
          res.data.data.forEach(item => {
            if (item?.field && typeof item.value === "number") {
              parsed[item.field] = item.value;
            }
          });

          setNpkData({
            nAvg: parsed.nAvg || 0,
            pAvg: parsed.pAvg || 0,
            kAvg: parsed.kAvg || 0,
          });
        } else {
          console.warn("Unexpected response structure:", res.data);
          setError("Failed to retrieve valid NPK data.");
        }
      } catch (err) {
        console.error("Error fetching NPK values from FastAPI:", err);
        setError(`Error fetching data from the server: ${err.message || "Unknown error occurred."}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNPK();
    const interval = setInterval(fetchNPK, 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-yellow-100 p-4 rounded-2xl shadow-md text-gray-800 ${className}`}>
      <h3 className="font-bold text-xl mb-2">NPK Values</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600 font-bold whitespace-pre-wrap">{error}</p>
      ) : (
        <div className="text-lg space-y-1">
          <p>🌱 Nitrogen (N): <span className="font-semibold">{npkData.nAvg.toFixed(2)}</span></p>
          <p>🌱 Phosphorus (P): <span className="font-semibold">{npkData.pAvg.toFixed(2)}</span></p>
          <p>🌱 Potassium (K): <span className="font-semibold">{npkData.kAvg.toFixed(2)}</span></p>
        </div>
      )}
    </div>
  );
};

export default NPKCard;
