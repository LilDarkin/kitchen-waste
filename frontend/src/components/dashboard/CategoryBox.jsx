import React from "react";

const CategoryBox = () => {
  return (
    <div className="border rounded-[10px] max-w-[350px] w-full min-h-[200px] h-auto bg-white text-[#83934D] flex flex-col items-start p-4 text-left">
      <p className="font-bold text-lg sm:text-xl">CATEGORY: Use for Plants:</p>
      
      <p className="text-base sm:text-lg">Use for Plants</p>
      <p className="text-base sm:text-lg">1. Methods</p>
      <p className="text-base sm:text-lg">2. Amount of soil</p>
      <p className="text-base sm:text-lg">3. Number of times to put soil</p>
    </div>
  );
};

export default CategoryBox;
