import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, KeyIcon, XCircleIcon, ArrowRightIcon } from "lucide-react";
import logo from "app/assets/nutricare.svg";
import "app/css/Animations.css";
import axios from "axios";

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
const res = await axios.post('https://harmless-sloth-coherent.ngrok-free.app/api/login', {
  email,
  password
})



      localStorage.setItem("token", res.data?.token);
      navigate("/welcome");
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#E9DFB4] to-[#f1e8c8] px-4"
    >
      {/* Logo with animation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={logo}
          alt="Nutricare Logo"
          className="w-20 h-20 sm:w-[200px] sm:h-[200px] bounce-slow"
        />
      </motion.div>

      {/* Title with animation */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-[32px] font-bold text-[#000000] mt-4 mb-2"
      >
        Welcome to NutriCycle!
      </motion.h1>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 w-[90%] max-w-[400px] bg-red-50 text-red-700 px-4 py-3 rounded-lg flex items-center"
          >
            <XCircleIcon className="w-5 h-5 mr-2" />
            <span>{error}</span>
            <button onClick={() => setError("")} className="ml-auto">
              <XCircleIcon className="w-5 h-5 text-red-400 hover:text-red-600" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Form with card effect */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-[90%] max-w-[400px] p-6"
      >
        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="mb-4">
            <label className="block ml-2 font-bold text-[18px] text-[#605353]">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full h-12 pl-3 pr-3 border border-gray-300 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-[#EFBFB3] focus:border-[#EFBFB3] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block ml-2 font-bold text-[18px] text-[#605353]">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full h-12 pl-3 pr-3 border border-gray-300 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-[#EFBFB3] focus:border-[#EFBFB3] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Login Button with loading state */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`w-full h-12 max-w-[200px] text-black bg-[#EFBFB3] text-lg font-bold rounded-lg hover:bg-[#d99e9a] transition-colors flex items-center justify-center mx-auto ${
              isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <div className="flex items-center">LOGIN</div>
            )}
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-2 flex flex-col space-y-3">
          <button
            type="button"
            className="text-[#512E2E] text-[14px] font-semibold hover:text-[#7a4949] transition-colors text-center cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot your password?
          </button>

          <div className="pt-3 border-t border-gray-200 text-center">
            <span className="text-black font-semibold text-sm select-none">
              Don't have an account?{" "}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              className="text-[#512E2E] font-semibold text-sm hover:text-[#7a4949] transition-colors cursor-pointer"
              onClick={() => navigate("/create-account")}
            >
              Register!
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
