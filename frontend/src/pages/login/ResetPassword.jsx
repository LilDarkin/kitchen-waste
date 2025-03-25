import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/nutricare.svg";

const ResetPassword = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (!token) {
      toast.error("No reset token provided");
      navigate('/login');
      return;
    }

    // Verify the reset token
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/verify-reset-token`, {
          params: { token }
        });
        
        setEmail(response.data.email);
        setTokenVerified(true);
      } catch (error) {
        toast.error(error.response?.data?.message || "Invalid reset token");
        navigate('/login');
      }
    };

    verifyToken();
  }, [location, navigate, API_URL]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      const response = await axios.post(`${API_URL}/auth/reset-password`, { 
        token,
        newPassword 
      });
      
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Error resetting password");
      }
      console.error('Error resetting password', error);
    } finally {
      setLoading(false);
    }
  };

  // If token is not verified, show nothing
  if (!tokenVerified) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#cfc493] px-4">
      {/* Logo & Title */}
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

        <input
          type="password"
          placeholder="New Password"
          className="w-full h-12 px-3 mb-4 border rounded-lg bg-white text-black text-xs font-medium"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full h-12 px-3 mb-4 border rounded-lg bg-white text-black text-xs font-medium"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />

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