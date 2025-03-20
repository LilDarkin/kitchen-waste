import { useState } from "react";
import { useNavigate } from "react-router-dom";
import komputer from "../../assets/Ilus.png";
import logo from "../../assets/nutricare.svg";
import emaillogo from "../../assets/email.svg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
    navigate("/login");
  };

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
        onSubmit={handleReset}
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
            className="w-[200px] cursor-pointer h-[49px] bg-[#EFBFB3] text-black font-semibold rounded-lg hover:bg-[#d99e9a]"
          >
            CONTINUE
          </button>

          <button
            className="w-[200px] cursor-pointer h-[49px] bg-[#cfc493] border-[#FFFFFF29]   border rounded-lg drop-shadow-xl text-black font-semibold  hover:bg-[#d99e9a]"
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
