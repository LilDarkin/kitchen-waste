import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import moment from "moment";
import { WiDayCloudy } from "react-icons/wi";
import logo from "../../assets/nutricare.svg";
import dashboardlogo from "../../assets/dashboard.png";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM D, YYYY h:mm A")
  );
  const [weatherIcon, setWeatherIcon] = useState(<WiDayCloudy />);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("MMMM D, YYYY h:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#E9DFB4]">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between p-6 md:p-9 bg-[#E9DFB4]">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-2" />
          <h1 className="text-xl md:text-2xl font-bold text-[#2A9134]">
            NutriCycle
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-gray-700">
          <span className="text-sm md:text-base">{currentTime} PST</span>
          <span className="flex items-center text-sm md:text-base">
            {weatherIcon} 32°C
          </span>
          <span className="text-sm md:text-base">ENGLISH</span>
          <button className="px-3 py-1 text-sm md:text-base rounded-2xl hover:bg-[#d9ee95] transition bg-[#83934D]">
            User Manual
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[#2A9134]">
          Welcome to NutriCycle!
        </h2>
        <p className="text-lg text-[#512E2E] max-w-lg text-center">
          Please safely dispose your kitchen waste <br />
          into NutriCycle to start the process.
        </p>
        <img
          src={dashboardlogo}
          alt="Dashboard Logo"
          className="h-[250px] w-[200px] md:h-[298px] md:w-[247px] mt-6"
        />
        <Outlet /> {/* Renders the child routes */}
        {/* LINK TO HOME PAGE */}
        <Link to="/dashboard/home" replace>
          <button className="w-[200px] md:w-[257px] h-[47px] uppercase mt-6 px-4 py-2 text-2xl font-bold bg-[#FDA4A5] text-black rounded-2xl hover:bg-[#cb8286] transition">
            Get Started
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Dashboard;
