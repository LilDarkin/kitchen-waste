import React, { useEffect, useState } from "react";
import axios from "axios";

const TempHumidCard = ({ className }) => {
  const [data, setData] = useState({ temperature: null, humidity: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTempHumid = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://harmless-sloth-coherent.ngrok-free.app/api/influx/latest");

        if (res.data.status === "success") {
          const temperatureObj = res.data.data.find(item => item.field === "temperature");
          const humidityObj = res.data.data.find(item => item.field === "humidity");

          setData({
            temperature: temperatureObj?.value ?? null,
            humidity: humidityObj?.value ?? null,
          });
        } else {
          setError("Invalid data received from the server.");
        }
      } catch (err) {
        console.error("Error fetching temp/humidity", err);
        setError(`Error fetching temperature/humidity: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTempHumid();
    const interval = setInterval(fetchTempHumid, 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-gradient-to-r from-blue-200 to-blue-100 p-4 rounded-2xl shadow-md text-gray-800 ${className}`}>
      <h3 className="font-bold text-xl mb-2">Temperature & Humidity</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600 font-bold whitespace-pre-wrap">{error}</p>
      ) : (
        <div className="text-lg space-y-1">
          <p>🌡️ Temperature: <span className="font-semibold">{data.temperature !== null ? `${data.temperature.toFixed(1)} °C` : "N/A"}</span></p>
          <p>💧 Humidity: <span className="font-semibold">{data.humidity !== null ? `${data.humidity.toFixed(1)} %` : "N/A"}</span></p>
        </div>
      )}
    </div>
  );
};

export default TempHumidCard;
