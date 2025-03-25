import React from "react";

import CategoryBox from "app/components/dashboard/CategoryBox";
import RecommendationBox from "app/components/dashboard/RecommendationBox";

const Analysis = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10">
      {/* Title Box */}
      <div className="border rounded-[10px] w-full max-w-[350px] h-[66px] bg-[#E9DFB4] text-center text-xl font-bold flex items-center justify-center">
        Analysis and Recommendation
      </div>

      {/* Two Boxes Side by Side */}
      <div className="flex flex-wrap gap-4 justify-center w-full">
        <CategoryBox />
        <RecommendationBox />
      </div>
    </div>
  );
};

export default Analysis;
