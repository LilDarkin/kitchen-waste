import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import dashboardlogo from "app/assets/dashboard.png";

const Welcome = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[#2A9134] transition-all duration-500 hover:text-[#1e6a26]">
          Welcome to NutriCycle!
        </h2>
        <p className="text-lg text-[#512E2E] max-w-lg text-center opacity-90 hover:opacity-100 transition-opacity duration-300">
          Please safely dispose your kitchen waste <br />
          into NutriCycle to start the process.
        </p>
        <img
          src={dashboardlogo}
          alt="Dashboard Logo"
          className="h-[250px] w-[200px] md:h-[298px] md:w-[247px] mt-6 transform transition-all duration-500 hover:scale-105"
        />
        <Outlet /> {/* Renders the child routes */}
        {/* LINK TO HOME PAGE */}
        <Link to="/dashboard" replace>
          <button
            className={`w-[200px] md:w-[257px] h-[47px] uppercase mt-6 px-4 py-2 text-2xl font-bold bg-[#FDA4A5] text-black rounded-2xl transition-all duration-300 ${
              isButtonHovered
                ? "bg-[#FDA4A5] transform -translate-y-1 shadow-lg"
                : "bg-[#FDA4A5] shadow-md"
            }`}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {isButtonHovered ? "→ Get Started" : "Get Started"}
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Welcome;
