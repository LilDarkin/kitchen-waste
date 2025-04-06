import React from "react";

import SuggestionBox from "app/components/dashboard/SuggestionBox";
import RecommendationBox from "app/components/dashboard/RecommendationBox";

const Analysis = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10">
      {/* Two Boxes Side by Side */}
      <div className="flex flex-wrap gap-4 justify-center w-full">
        <RecommendationBox />
        <SuggestionBox />
      </div>
    </div>
  );
};

export default Analysis;
