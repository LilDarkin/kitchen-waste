import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "./icons/HomeIcon.jsx";
import DashboardIcon from "./icons/DashboardIcon.jsx";
import PNSIcon from "./icons/PNSIcon.jsx";
import ProfileIcon from "./icons/ProfileIcon.jsx";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Determine which route is active
  const isAnalysisActive = currentPath.includes("/analysis");
  const isDashboardActive = currentPath.includes("/dashboard");
  const isPNSActive = currentPath.includes("/pns");
  const isProfileActive = currentPath.includes("/profile");

  // Navigation handlers
  const navigateToAnalysis = () => navigate("/analysis");
  const navigateToDashboard = () => navigate("/dashboard");
  const navigateToPNS = () => navigate("/pns");
  const navigateToProfile = () => navigate("/profile");

  return (
    <div
      className={`
            fixed bottom-0 left-0 right-0 md:static
            bg-[#44562F] 
            flex flex-row md:flex-col 
            items-center justify-around md:justify-start
            py-2 md:py-4 
            md:w-20 md:h-[500px]
            z-10
            md:rounded-md
        `}
    >
      <div className="flex flex-row md:flex-col md:gap-20 md:mt-4 w-full items-center justify-around md:justify-start">
        <button
          onClick={navigateToDashboard}
          className={`
                        w-12 h-12 md:w-10 md:h-10 
                        rounded-md 
                        ${isDashboardActive ? "bg-green-500" : "bg-green-700"} 
                        flex items-center justify-center 
                        text-white
                        my-2 md:my-0 md:mx-auto
                    `}
          aria-label="Dashboard"
        >
          <HomeIcon isActive={isDashboardActive} />
        </button>

        <button
          onClick={navigateToAnalysis}
          className={`
                        w-12 h-12 md:w-10 md:h-10 
                        rounded-md 
                        ${isAnalysisActive ? "bg-green-500" : "bg-green-700"} 
                        flex items-center justify-center 
                        text-white
                        my-2 md:my-0 md:mx-auto
                    `}
          aria-label="Analysis"
        >
          <DashboardIcon isActive={isAnalysisActive} />
        </button>

        <button
          onClick={navigateToPNS}
          className={`
                        w-12 h-12 md:w-10 md:h-10 
                        rounded-md 
                        ${isPNSActive ? "bg-green-500" : "bg-green-700"} 
                        flex items-center justify-center 
                        text-white
                        my-2 md:my-0 md:mx-auto
                    `}
          aria-label="PNS"
        >
          <PNSIcon isActive={isPNSActive} />
        </button>

        <button
          onClick={navigateToProfile}
          className={`
                        w-12 h-12 md:w-10 md:h-10 
                        rounded-md 
                        ${isProfileActive ? "bg-green-500" : "bg-green-700"} 
                        flex items-center justify-center 
                        text-white
                        my-2 md:my-0 md:mx-auto
                    `}
          aria-label="Profile"
        >
          <ProfileIcon isActive={isProfileActive} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
