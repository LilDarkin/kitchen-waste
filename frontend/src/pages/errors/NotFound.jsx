import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateRotation = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleRad = Math.atan2(mousePosition.y - centerY, mousePosition.x - centerX);
    return (angleRad * 180) / Math.PI;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden select-none">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.2)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-50"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <div className="relative z-10 text-center">
        {/* Main 404 text with glow effect */}
        <motion.h1
          className="text-8xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textShadow: "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)"
          }}
        >
          4
          <motion.span
            animate={{
              rotate: calculateRotation(),
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { type: "spring", stiffness: 100 },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="inline-block"
          >
            0
          </motion.span>
          4
        </motion.h1>

        {/* Subtitle with typing effect */}
        <motion.p
          className="text-xl text-blue-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Page not found
        </motion.p>

        {/* Animated button */}
        <motion.button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                     hover:bg-blue-700 transition-colors duration-300 
                     shadow-lg shadow-blue-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate("/")}
        >
          Take Me Home
        </motion.button>
      </div>

      {/* Glowing orb following cursor */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)"
        }}
      />
    </div>
  );
};

export default NotFound;
