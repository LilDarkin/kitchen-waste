import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import moment from "moment";
import {
  WiDayCloudy,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiCloudy,
} from "react-icons/wi";
import logo from "../../assets/nutricare.svg";
import dashboardlogo from "../../assets/dashboard.png";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM D, YYYY h:mm:ss A")
  );
  const [weatherIcon, setWeatherIcon] = useState(<WiDayCloudy size={24} />);
  const [temperature, setTemperature] = useState("32°C");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isManualHovered, setIsManualHovered] = useState(false);

  // Real-time clock update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("MMMM D, YYYY h:mm:ss A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulated real-time weather update
  useEffect(() => {
    // Fetch weather data when component mounts
    fetchWeatherData();

    // Set up interval to update weather every 15 minutes (900000ms)
    const weatherInterval = setInterval(fetchWeatherData, 900000);
    return () => clearInterval(weatherInterval);
  }, []);

  // Simulate weather API call
  const fetchWeatherData = () => {
    // This is a simulation - in a real app, you'd make an API call to a weather service
    const weatherTypes = [
      { icon: <WiDaySunny size={24} />, temp: "32°C" },
      { icon: <WiDayCloudy size={24} />, temp: "28°C" },
      { icon: <WiCloudy size={24} />, temp: "25°C" },
      { icon: <WiRain size={24} />, temp: "22°C" },
      { icon: <WiThunderstorm size={24} />, temp: "20°C" },
    ];

    // For demo purposes, we're using the current time to select a weather condition
    // This creates the illusion of changing weather based on time
    const hour = new Date().getHours();
    const index = Math.floor((hour % 12) / 2.4); // Will give values 0-4 based on hour

    setWeatherIcon(weatherTypes[index].icon);
    setTemperature(weatherTypes[index].temp);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E9DFB4]">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between p-6 md:p-9 bg-[#E9DFB4] transition-all duration-300 shadow-sm hover:shadow-md">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-10 mr-2 transform transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-xl md:text-2xl font-bold text-[#2A9134]">
            NutriCycle
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-gray-700">
          <span className="text-sm md:text-base animate-pulse">
            {currentTime} 
          </span>
          <span className="flex items-center text-sm md:text-base transition-all duration-500 hover:scale-110">
            {weatherIcon} {temperature}
          </span>
          <span className="text-sm md:text-base relative group">
            ENGLISH
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2A9134] transition-all duration-300 group-hover:w-full"></span>
          </span>
          <button
            className={`px-3 py-1 text-sm md:text-base rounded-2xl transition-all duration-300 bg-[#83934D] ${
              isManualHovered ? "bg-opacity-90 transform scale-105" : ""
            }`}
            onMouseEnter={() => setIsManualHovered(true)}
            onMouseLeave={() => setIsManualHovered(false)}
          >
            User Manual
          </button>
        </div>
      </header>

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
        <Link to="/dashboard/home" replace>
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

export default Dashboard;
