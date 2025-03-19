import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, RefreshCw, ArrowRight } from "lucide-react";

const NotFound = () => {
  const [isGoingHome, setIsGoingHome] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleGoHome = () => {
    setIsGoingHome(true);
    // In a real app, you would redirect here
    setTimeout(() => {
      setIsGoingHome(false);
    }, 2000);
  };

  const handleDragEnd = () => {
    // Reset after dragging ends
    setIsDragging(false);
    setRotation(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md w-full"
      >
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDrag={(_, info) => {
            // Change rotation based on drag direction and amount
            setRotation(info.offset.x * 0.1);
          }}
          onDragEnd={handleDragEnd}
          animate={{
            rotate: isDragging ? rotation : [0, 5, -5, 0],
            scale: isDragging ? 1.1 : 1,
          }}
          transition={{
            duration: 3,
            repeat: isDragging ? 0 : Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="mb-8 text-green-600 font-bold text-9xl cursor-grab active:cursor-grabbing mx-auto inline-block"
        >
          404
        </motion.div>

        <motion.h1 className="text-2xl font-medium text-green-800 mb-4">
          Oops! Page Not Found
        </motion.h1>

        <motion.p className="text-green-600 mb-12">
          We can't seem to find the page you're looking for.
        </motion.p>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors hover:bg-green-700"
            disabled={isGoingHome}
          >
            {isGoingHome ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Home className="h-5 w-5" />
                Home
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
