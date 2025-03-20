import { useState } from "react";
import { useNavigate } from "react-router-dom";
import komputer from "../../assets/Ilus.png";
import logo from "../../assets/nutricare.svg";

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
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Forgot Password?</h1>

            {/* Komputer Image */}
            <img src={komputer} alt="Forgot Password Illustration" className="w-48 sm:w-64 mb-4" />

            {/* Form */}
            <form onSubmit={handleReset} className="w-full max-w-[400px] flex flex-col items-center">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-12 px-3 border rounded-lg bg-white text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Centered Buttons */}
                <div className="flex flex-col items-center gap-3 mt-4">
                    <button
                        type="submit"
                        className="w-[200px] h-12 bg-[#EFBFB3] text-black font-semibold rounded-lg"
                    >
                        CONTINUE
                    </button>

                    <button
                        className="w-[200px] h-12 bg-[#cfc493] border  text-black font-semibold rounded-lg"
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
