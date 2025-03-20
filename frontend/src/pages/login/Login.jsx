import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/nutricare.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "admin@example.com" && password === "password") {
            navigate("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#E9DFB4] px-4">
            {/* Logo */}
            <img src={logo} alt="Nutricare Logo" className="w-20 h-20 sm:w-[150px] sm:h-[120px]" />

            {/* Title Below Logo */}
            <h1 className="text-2xl sm:text-3xl font-bold text-black mt-4">Welcome to NutriCycle!</h1>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="w-[90%] max-w-[400px] flex flex-col mt-6">
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-[#605353]">Email</label>
                    <input
                        type="email"
                        className="w-full h-12 px-3 border rounded-lg mt-1 bg-white text-black outline-none focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-[#605353]">Password</label>
                    <input
                        type="password"
                        className="w-full h-12 px-3 border rounded-lg mt-1 bg-white text-black outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full h-12 text-black bg-[#EFBFB3] text-xl font-bold rounded-lg hover:bg-[#d99e9a] uppercase"
                >
                    Login
                </button>

                {/* Forgot Password Link */}
                <div className="text-center mt-4 text-sm">
                    <button
                        type="button"
                        className="text-[#512E2E] hover:underline"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Register Link */}
                <div className="text-center mt-2 text-sm">
                    <span className="text-black">Don’t have an account? </span>
                    <button
                        type="button"
                        className="text-[#512E2E] font-semibold hover:underline"
                        onClick={() => navigate("/create-account")}
                    >
                        Register!
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
