import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import PandaFace from "app/assets/panda-face.svg";

import { EyeIcon, EyeOffIcon } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const user = jwtDecode(token);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={PandaFace} alt="Panda Face" className="w-20 h-20" />
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          className="w-full h-12 pl-3 pr-3 border border-gray-300 rounded-lg bg-[#f3f3f4] text-[#0d0c22] transition-all duration-300 focus:outline-none focus:border-[#EFBFB3] focus:bg-white focus:ring-2 focus:ring-[rgba(239,191,179,0.3)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Username"
          className="w-full h-12 pl-3 pr-3 border border-gray-300 rounded-lg bg-[#f3f3f4] text-[#0d0c22] transition-all duration-300 focus:outline-none focus:border-[#EFBFB3] focus:bg-white focus:ring-2 focus:ring-[rgba(239,191,179,0.3)]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="relative max-w-[228px] w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full h-12 pl-3 pr-12 border border-gray-300 rounded-lg bg-[#f3f3f4] text-[#0d0c22] transition-all duration-300 focus:outline-none focus:border-[#EFBFB3] focus:bg-white focus:ring-2 focus:ring-[rgba(239,191,179,0.3)]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
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
