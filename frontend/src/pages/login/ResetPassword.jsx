import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/nutricare.svg";

const ResetPassword = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced password validation function
  const isPasswordValid = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const validationErrors = [];
    if (password.length < minLength) validationErrors.push("At least 8 characters long");
    if (!hasUpperCase) validationErrors.push("Include uppercase letter");
    if (!hasLowerCase) validationErrors.push("Include lowercase letter");
    if (!hasNumber) validationErrors.push("Include a number");
    if (!hasSpecialChar) validationErrors.push("Include a special character");

    return {
      valid: validationErrors.length === 0,
      message: validationErrors.length > 0 
        ? `Password requirements not met:\n${validationErrors.join('\n')}` 
        : ""
    };
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (!token) {
      toast.error("No reset token provided");
      navigate('/login');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/verify-reset-token`, {
          params: { token }
        });
        
        setEmail(response.data.email);
        setTokenVerified(true);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 
          "Token verification failed. Please request a new password reset.";
        toast.error(errorMessage);
        navigate('/login');
      }
    };

    verifyToken();
  }, [location, navigate, API_URL]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate password strength
    const passwordValidation = isPasswordValid(newPassword);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.message);
      return;
    }

    setLoading(true);

    try {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      const response = await axios.post(`${API_URL}/reset-password`, { 
        token,
        newPassword 
      });
      
      toast.success(response.data.message || "Password reset successfully");
      navigate("/login");
    } catch (error) {
      // Comprehensive error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        const errorMessage = error.response.data.message || 
          "Unable to reset password. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please check your internet connection.");
      } else {
        // Something happened in setting up the request
        toast.error("An unexpected error occurred. Please try again later.");
      }
      console.error('Error resetting password', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  if (!tokenVerified) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#cfc493] px-4">
      <div className="flex items-center mb-6">
        <img src={logo} alt="Nutricare Logo" className="w-16 h-16" />
        <h1 className="text-3xl font-bold text-[#44562F] ml-3">NutriCycle</h1>
      </div>

      <h1 className="text-2xl font-bold text-black mb-6">Reset Password</h1>

      <form 
        onSubmit={handleResetPassword}
        className="w-full max-w-[400px] flex flex-col items-center"
      >
        <p className="text-center mb-4 text-gray-700">
          Reset password for {email}
        </p>

        <div className="relative w-full mb-4">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full h-12 px-3 border rounded-lg bg-white text-black text-xs font-medium pr-10"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('new')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative w-full mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            className="w-full h-12 px-3 border rounded-lg bg-white text-black text-xs font-medium pr-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirm')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-[200px] cursor-pointer h-[49px] text-black font-semibold rounded-lg 
            ${loading ? 'bg-gray-300' : 'bg-[#EFBFB3] hover:bg-[#d99e9a]'}`}
        >
          {loading ? 'RESETTING...' : 'RESET PASSWORD'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;