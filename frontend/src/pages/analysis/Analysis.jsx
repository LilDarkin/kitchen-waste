import React from "react";

import CategoryBox from "app/components/dashboard/CategoryBox";
import RecommendationBox from "app/components/dashboard/RecommendationBox";

const Analysis = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10">
      {/* Title Box */}
      <div className="border rounded-[10px] w-[558px] h-[66px] bg-[#E9DFB4] flex justify-center items-center text-xl font-bold">
        Analysis and Recommendation
      </div>

      {/* Two Boxes Side by Side */}
      <div className="flex gap-4">
        <CategoryBox />
        <RecommendationBox />
      </div>
    </div>
  );
};

export default Analysis;
