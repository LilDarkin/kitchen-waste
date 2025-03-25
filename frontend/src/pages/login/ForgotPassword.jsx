import { useState } from "react";
import { useNavigate } from "react-router-dom";
import komputer from "../../assets/Ilus.png";
import logo from "../../assets/nutricare.svg";
import emaillogo from "../../assets/email.svg";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      
      // Set email sent state instead of navigating
      setEmailSent(true);
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request
        toast.error("Error sending password reset request");
      }
      console.error('Error sending password reset email', error);
    } finally {
      setLoading(false);
    }
  };

  // If email has been sent, show a different view
  if (emailSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#cfc493] px-4">
        <div className="flex items-center mb-6">
          <img src={logo} alt="Nutricare Logo" className="w-16 h-16" />
          <h1 className="text-3xl font-bold text-[#44562F] ml-3">NutriCycle</h1>
        </div>

        <div className="text-center max-w-[400px] p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#44562F] mb-4">Reset Link Sent</h2>
          <p className="text-gray-700 mb-6">
            A password reset link has been sent to {email}. 
            Please check your email to reset your password.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full h-12 bg-[#EFBFB3] text-black font-semibold rounded-lg hover:bg-[#d99e9a]"
          >
            BACK TO LOGIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#cfc493] px-4">
      {/* Logo & Title */}
      <div className="flex items-center mb-6">
        <img src={logo} alt="Nutricare Logo" className="w-16 h-16" />
        <h1 className="text-3xl font-bold text-[#44562F] ml-3">NutriCycle</h1>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-xl font-bold text-black mb-2">
        Forgot Password?
      </h1>

      {/* Komputer Image */}
      <img
        src={komputer}
        alt="Forgot Password Illustration"
        className="w-60 sm:w-64 mb-4"
      />

      {/* Form */}
      <form
        onSubmit={handleForgotPassword}
        className="w-full max-w-[400px] flex flex-col items-center"
      >
        <div className="relative w-full">
          <img
            src={emaillogo}
            alt="Email Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 pl-12 pr-3 border rounded-lg bg-white text-black text-xs font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Centered Buttons */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-[200px] cursor-pointer h-[49px] text-black font-semibold rounded-lg 
              ${loading ? 'bg-gray-300' : 'bg-[#EFBFB3] hover:bg-[#d99e9a]'}`}
          >
            {loading ? 'SENDING...' : 'CONTINUE'}
          </button>

          <button
            type="button"
            className="w-[200px] cursor-pointer h-[49px] bg-[#cfc493] border-[#FFFFFF29] border rounded-lg drop-shadow-xl text-black font-semibold hover:bg-[#d99e9a]"
            onClick={() => navigate("/login")}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;