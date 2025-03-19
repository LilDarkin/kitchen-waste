import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, UserX, Home, HelpCircle } from "lucide-react";

const Alternative401Page = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Top bar */}
        <motion.div
          className="bg-green-600 h-2 w-full rounded-t-lg mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />

        {/* Interactive icon area */}
        <div className="flex justify-center mb-10">
          <motion.div
            className="relative cursor-pointer"
            onClick={triggerAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="bg-green-100 w-32 h-32 rounded-full flex items-center justify-center cursor-pointer"
              animate={
                isAnimating
                  ? {
                      rotateY: [0, 180],
                    }
                  : {}
              }
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.div
                animate={isAnimating ? { opacity: [1, 0] } : { opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Lock className="h-16 w-16 text-green-600" />
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={
                  isAnimating
                    ? {
                        opacity: [0, 1],
                        rotateY: [180, 0],
                      }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <UserX className="h-16 w-16 text-green-600" />
              </motion.div>
            </motion.div>

            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-300"
              animate={
                isAnimating
                  ? {
                      scale: [1, 1.3],
                      opacity: [0.5, 0],
                    }
                  : {}
              }
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-300"
              animate={
                isAnimating
                  ? {
                      scale: [1, 1.5],
                      opacity: [0.5, 0],
                    }
                  : {}
              }
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />
          </motion.div>
        </div>

        <div className="text-center mb-8">
          <motion.h1
            className="text-5xl font-bold text-green-800 tracking-tighter"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            401
          </motion.h1>

          <motion.h2
            className="text-xl font-medium text-green-700 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Access Restricted
          </motion.h2>
        </div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-sm border border-green-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-green-700 text-center">
            Sorry, you don't have permission to view this page.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="#"
            className="flex items-center justify-center gap-2 py-2 px-4 bg-green-600 text-white rounded-lg font-medium min-w-24"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Home className="h-4 w-4" />
            Home
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Alternative401Page;
