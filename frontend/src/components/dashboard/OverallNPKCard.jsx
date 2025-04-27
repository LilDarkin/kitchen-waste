import React, { useEffect, useState } from "react";
import axios from "axios";

const OverallNPKCard = ({ className }) => {
  const [data, setData] = useState({
    overallNPK: 0,
    npkCategory: "Uncategorized",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categorizeNPK = (n, p, k) => {
    const avg = (n + p + k) / 3.0;
    if (avg >= 5.0 && avg <= 10.0) return "Organic Fertilizer";
    if (avg >= 2.5 && avg < 5.0) return "Organic Soil Conditioner";
    if (avg >= 0.5 && avg < 2.5) return "Organic Plant Supplement";
    return "Uncategorized";
  };

  useEffect(() => {
    const fetchNPK = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://harmless-sloth-coherent.ngrok-free.app/api/influx/latest");

        if (res.data?.status === "success" && Array.isArray(res.data.data)) {
          const parsed = {};
          res.data.data.forEach(item => {
            if (item?.field && typeof item.value === "number") {
              parsed[item.field] = item.value;
            }
          });

          const { nAvg = 0, pAvg = 0, kAvg = 0 } = parsed;
          const avg = (nAvg + pAvg + kAvg) / 3.0;

          setData({
            overallNPK: avg,
            npkCategory: categorizeNPK(nAvg, pAvg, kAvg),
          });
        } else {
          console.warn("Unexpected response structure:", res.data);
          setError("Failed to fetch valid NPK data.");
        }
      } catch (err) {
        console.error("Error fetching Overall NPK:", err);
        setError(`Error fetching data: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNPK();
    const interval = setInterval(fetchNPK, 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-orange-100 p-4 rounded-2xl shadow-md text-gray-800 ${className}`}>
      <h3 className="font-bold text-xl mb-2">Overall NPK</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500 font-semibold whitespace-pre-wrap">{error}</p>
      ) : (
        <>
          <p>🌿 Overall NPK: <span className="font-semibold">{data.overallNPK.toFixed(2)}</span></p>
          <p>🧩 Category: <span className="font-bold">{data.npkCategory}</span></p>
        </>
      )}
    </div>
  );
};

export default OverallNPKCard;
