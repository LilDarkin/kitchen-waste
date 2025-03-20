import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";   
import logo from "app/assets/nutricare.svg";

const CreateAccount = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCreateAccount = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        alert(`Account created for ${name}!`);
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#cfc493] px-4">
            {/* Logo & Label */}
            <div className="flex items-center mb-6">
                <img src={logo} alt="Nutricare Logo" className="w-16 h-16" />
                <h1 className="text-3xl font-bold text-[#44562F] ml-3">NutriCycle</h1>
            </div>

            <h2 className="text-2xl font-bold text-black mb-6">Create an Account</h2>

            <form onSubmit={handleCreateAccount} className="w-[400px] flex flex-col items-center">
                {/* Username */}
                <label className="self-start text-lg font-semibold text-[#512E2E]">Username</label>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full h-10 leading-7 pl-10 pr-4 border-2 border-transparent rounded-lg outline-none bg-[#f3f3f4] text-[#0d0c22] transition-all duration-300 ease-in-out placeholder:text-[#9e9ea7] focus:outline-none focus:border-[rgba(234,76,137,0.4)] focus:bg-white focus:ring-4 focus:ring-[rgba(234,76,137,0.1)] hover:outline-none hover:border-[rgba(234,76,137,0.4)] hover:bg-white hover:ring-4 hover:ring-[rgba(234,76,137,0.1)]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                {/* Email */}
                <label className="self-start text-lg font-semibold mt-3 text-[#512E2E]">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-[50px] p-2 border rounded-lg mt-1 bg-white text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Password */}
                <label className="self-start text-lg font-semibold mt-3 text-[#512E2E]">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full h-[50px] p-2 border rounded-lg mt-1 bg-white text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Confirm Password */}
                <label className="self-start text-lg font-semibold mt-3 text-[#512E2E]">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full h-[50px] p-2 border rounded-lg mt-1 bg-white text-black"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {/* Password Error Message */}
                {error && <p className="text-red-600 mt-2">{error}</p>}

                {/* Create Account Button */}
                <button
                    type="submit"
                    className="uppercase w-[250px] h-[50px] bg-[#EFBFB3] text-2xl text-black font-bold py-2 rounded-lg mt-4 hover:bg-[#d99e9a]"
                >
                    Sign in
                </button>
            </form>

            {/* Terms & Conditions */}
            <p className="text-sm text-[#512E2E] text-center mt-4 px-6">
                By signing up, you agree to our{" "}
                <Link to="/terms-of-use" className="underline text-[#512E2EA8] hover:text-blue-500">
                    Terms of Use and Privacy Policy
                </Link>{" "}
            </p>
        </div>
    );
};

export default CreateAccount;
