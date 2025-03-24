import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
} from "lucide-react";
import logo from "app/assets/nutricare.svg";
import "app/css/Animations.css";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordMatch = password === confirmPassword && password !== "";

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/register`,
        { name, email, password },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status !== 200) {
        throw new Error(res.data.message || "Failed to create account");
      }

      setSuccessMessage(res.data?.message || "Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
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
      className="flex flex-col items-center justify-center min-h-screen bg-[#cfc493] px-4 py-8"
    >
      {/* Logo & Label */}
      <motion.div
        className="flex items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={logo}
          alt="Nutricare Logo"
          className="w-30 h-30 bounce-slow"
        />
        <h1 className="text-3xl font-bold text-[#44562F] ml-2">NutriCycle</h1>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Create an Account
      </motion.h2>

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 w-[400px] bg-green-50 text-green-700 px-4 py-3 rounded-lg flex items-center"
          >
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-[400px]"
      >
        <form onSubmit={handleCreateAccount} className="flex flex-col">
          {/* Username */}
          <div className="mb-4">
            <label className="block text-md font-medium text-[#512E2E] mb-2">
              Username
            </label>
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
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-md font-medium text-[#512E2E] mb-2">
              Email
            </label>
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
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-md font-medium text-[#512E2E] mb-2">
              Password
            </label>
            <div className="relative">
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

            {/* Password strength indicators */}
            <div className="mt-2 space-y-1">
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    hasMinLength ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <span className="text-xs text-gray-600">
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    hasUpperCase ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <span className="text-xs text-gray-600">
                  At least one uppercase letter
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    hasNumber ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <span className="text-xs text-gray-600">
                  At least one number
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-md font-medium text-[#512E2E] mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`w-full h-12 pl-3 pr-12 border border-gray-300 rounded-lg bg-[#f3f3f4] text-[#0d0c22] transition-all duration-300 focus:outline-none focus:border-[#EFBFB3] focus:bg-white focus:ring-2 focus:ring-[rgba(239,191,179,0.3)] ${
                  confirmPassword &&
                  (isPasswordMatch ? "border-green-500" : "border-red-500")
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {/* Password match indicator */}
            {confirmPassword && (
              <div className="mt-1 flex items-center">
                {isPasswordMatch ? (
                  <span className="text-xs text-green-600 flex items-center">
                    <CheckCircleIcon className="h-3 w-3 mr-1" /> Passwords match
                  </span>
                ) : (
                  <span className="text-xs text-red-600 flex items-center">
                    <AlertCircleIcon className="h-3 w-3 mr-1" /> Passwords do
                    not match
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center"
              >
                <AlertCircleIcon className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Create Account Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`uppercase cursor-pointer w-full max-w-[220px] mx-auto h-12 bg-[#d99e9a] text-xl text-black font-bold rounded-lg mt-4 hover:bg-[#EFBFB3] transition-colors flex items-center justify-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-black"
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
              "Sign Up"
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Terms & Conditions */}
      <motion.p
        className="text-[12px] text-[#512E2E] text-center mt-4 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        By signing up, you agree to our{" "}
        <Link
          to="/terms-of-use"
          className="text-[#512E2EA8] hover:text-[#512E2E] transition-colors font-medium"
        >
          Terms of Use and Privacy Policy
        </Link>
      </motion.p>

      {/* Login Link */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-black font-semibold text-[12px] select-none">
          Already have an account?{" "}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="button"
          className="text-[#512E2E] font-semibold text-[12px] hover:text-[#7a4949] transition-colors cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CreateAccount;
