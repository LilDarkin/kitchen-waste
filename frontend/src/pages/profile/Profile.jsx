import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import PandaFace from "app/assets/panda-face.svg";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [userData, setUserData] = useState(null);

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    try {
      const user = jwtDecode(token);
      setUserData(user);
      setOriginalName(user.name);
      setName(user.name);
      setEmail(user.email);
      setUserID(user.id);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  const save = async () => {
    try {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeftInSeconds = userData.exp - currentTime;

      let expiresIn = "1h";

      if (timeLeftInSeconds > 3600) {
        expiresIn = `${Math.floor(timeLeftInSeconds / 3600)}h`;
      } else if (timeLeftInSeconds > 60) {
        expiresIn = `${Math.floor(timeLeftInSeconds / 60)}m`;
      } else {
        expiresIn = `${timeLeftInSeconds}s`;
      }

      const response = await axios.patch(
        `${API_URL}/update-username/${userID}`,
        {
          username: name,
          expiresIn,
        }
      );

      if (response.status === 200) {
        setOriginalName(name);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update username"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={PandaFace} alt="Panda Face" className="w-20 h-20" />
      <div className="relative w-full max-w-[300px]">
        <input
          type="email"
          placeholder="Email"
          className="w-full cursor-not-allowed h-12 pl-3 pr-3 border border-gray-300 rounded-lg bg-[#ababaeac] text-[#0d0c22] transition-all duration-300"
          value={email}
          disabled
        />
      </div>
      <div className="relative w-full max-w-[300px]">
        <input
          type="text"
          placeholder="Username"
          className="w-full h-12 pl-3 pr-3 border border-gray-300 rounded-lg bg-[#f3f3f4] text-[#0d0c22] transition-all duration-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {originalName !== name && (
        <button
          type="button"
          className="text-[#512E2E] bg-[#EFBFB3] w-full max-w-[200px] p-1 rounded-lg font-bold text-[15px] hover:text-[#7a4949] transition-colors cursor-pointer"
          onClick={() => save()}
        >
          SAVE
        </button>
      )}

      <button
        type="button"
        className="text-[#512E2E] bg-[#EFBFB3] w-full max-w-[200px] p-1 rounded-lg font-bold text-[15px] hover:text-[#7a4949] transition-colors cursor-pointer"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        LOG OUT
      </button>
    </div>
  );
};

export default Profile;
