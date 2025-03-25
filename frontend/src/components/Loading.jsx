import React from "react";
import { motion } from "framer-motion";

const FastLoadingPage = () => {
  return (
    <div className="flex flex-col items-center h-96 justify-center bg-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-center"
      >
        <motion.div className="flex space-x-2 justify-center mb-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="h-3 w-3 bg-green-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                delay: dot * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <motion.p
          className="text-green-600 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          Loading
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FastLoadingPage;
