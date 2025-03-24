import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckUser = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const code = window.location.pathname.split("/").pop();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verifyUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/verify/${code}`);
        toast.success(response?.data?.message || "User verified successfully", {
          position: "top-right",
        });
        navigate("/login");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to verify user", {
          position: "top-right",
        });
        navigate("/not-found");
      }
    };

    verifyUser();
  }, [API_URL, code, navigate]);

  return null;
};

export default CheckUser;
