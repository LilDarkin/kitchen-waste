import { useState, useEffect } from "react";
import axios from "axios";

const useLatestSensorData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.76.112:8080/api/influx/latest");

        if (res.data.status === "success" && res.data.data) {
          const parsedData = res.data.data;  // Since the data is already in object format
          setData(parsedData);  // Set the object directly to the state
        } else {
          console.error("Invalid data structure:", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch sensor data:", err);
      } finally {
        setLoading(false);  // Set loading to false when the request completes
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Clean up interval when component unmounts
  }, []); // Empty dependency array ensures the effect runs once when component mounts

  return { data, loading };
};

export default useLatestSensorData;
