import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  WiDayCloudy,
  WiDaySunny,
  WiThunderstorm,
  WiCloudy,
  WiRain,
} from "react-icons/wi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM D, YYYY h:mm A")
  );
  const [weatherIcon, setWeatherIcon] = useState(<WiDayCloudy size={24} />);
  const [temperature, setTemperature] = useState("32°C");
  const [isManualHovered, setIsManualHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("MMMM D, YYYY h:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchWeatherData();
    const weatherInterval = setInterval(fetchWeatherData, 900000);
    return () => clearInterval(weatherInterval);
  }, []);

  const fetchWeatherData = () => {
    const weatherTypes = [
      { icon: <WiDaySunny size={24} />, temp: "32°C" },
      { icon: <WiDayCloudy size={24} />, temp: "28°C" },
      { icon: <WiCloudy size={24} />, temp: "25°C" },
      { icon: <WiRain size={24} />, temp: "22°C" },
      { icon: <WiThunderstorm size={24} />, temp: "20°C" },
    ];
    const hour = new Date().getHours();
    const index = Math.floor((hour % 12) / 2.4);
    setWeatherIcon(weatherTypes[index].icon);
    setTemperature(weatherTypes[index].temp);
  };

  return (
    <header className="flex flex-wrap items-center bg-[#E9DFB4] justify-between p-4 shadow-md">
      <div className="flex items-center">
        <img src="/nutricare.svg" alt="Logo" className="h-10 mr-2" />
        <h1 className="text-xl md:text-2xl font-bold text-green-700">
          NutriCycle
        </h1>
      </div>
      <div className="flex items-center gap-4 text-gray-700">
        <span className="text-sm">{currentTime}</span>
        <span className="flex items-center text-sm">
          {weatherIcon} {temperature}
        </span>
        <span className="text-sm border-r border-gray-300 pr-4">English</span>
        <button
          onClick={() => navigate("/user-manual")}
          className="px-3 py-1.5 text-sm rounded-md bg-green-700 text-white hover:bg-green-800 transition-colors cursor-pointer"
        >
          USER MANUAL
        </button>
      </div>
    </header>
  );
};

export default Navbar;
