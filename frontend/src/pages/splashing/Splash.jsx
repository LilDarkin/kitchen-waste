import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "app/assets/nutricare.svg";
import { useNavigate } from "react-router-dom";
import "app/css/Animations.css";

const Splash = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  const screens = [
    {
      id: 1,
      title: "Team Up for Sustainability",
      subtitle: "Turn your kitchen waste into nutrient-rich soil with ease!",
    },
    {
      id: 2,
      title: "Smart Kitchen Waste Processing",
      subtitle: "Automated drying, grinding, and analysis-all in one device!",
    },
    {
      id: 3,
      title: "Stay Informed, Grow Smarter",
      subtitle:
        "Track NPK, pH, and soil health instantly—right from your phone!",
    },
  ];

  const currentData = screens[currentScreen];

  const handleNext = () => {
    setCurrentScreen((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`w-full h-screen flex items-center justify-center bg-[#E9DFB4] transition-colors duration-500`}
    >
      <div className="w-full mx-auto p-8">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />

          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex flex-col items-center">
              <img
                src={logo}
                alt="Nutricare Logo"
                className="w-[187px] h-[157px] select-none bounce-slow"
              />
              <div className="text-[48px] font-bold text-[#44562F]">
                NutriCycle
              </div>
            </div>
            <div className="flex flex-col items-center mt-[50px]">
              <p className="text-[32px] font-bold text-black">
                {currentData.title}
              </p>
              <p className="text-[20px] font-medium text-black mt-2 max-w-[290px] text-center">
                {currentData.subtitle}
              </p>
            </div>
          </div>

          {currentData.id !== 3 && (
            <div>
              <motion.button
                onClick={handleNext}
                className={`flex items-center justify-center bg-[#83934D] text-white px-8 py-1 mt-4 rounded-[12px] w-full max-w-[250px] font-bold cursor-pointer hover:bg-[#83934da9] transition-colors duration-500 mx-auto`}
                style={{ background: currentData.accent }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                NEXT
              </motion.button>
              <motion.button
                onClick={() => navigate("/login")}
                className={`flex items-center justify-center text-black px-8 py-1 mt-4 rounded-[12px] w-full max-w-[250px] font-bold cursor-pointer mx-auto`}
                style={{ background: currentData.accent }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                CANCEL
              </motion.button>
            </div>
          )}
          {currentData.id === 3 && (
            <div>
              <motion.button
                onClick={() => navigate("/login")}
                className={`flex items-center justify-center bg-[#83934D] text-white px-8 py-1 mt-4 rounded-[12px] w-full max-w-[250px] font-bold cursor-pointer hover:bg-[#83934da9] transition-colors duration-500 mx-auto`}
                style={{ background: currentData.accent }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                LOG IN
              </motion.button>
              <motion.button
                onClick={() => navigate("/create-account")}
                className={`flex items-center justify-center text-black px-8 py-1 mt-4 rounded-[12px] w-full max-w-[250px] font-bold cursor-pointer mx-auto`}
                style={{ background: currentData.accent }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                REGISTER
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Splash;
