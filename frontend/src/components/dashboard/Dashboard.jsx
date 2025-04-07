import NPKCard from "./NPKCard";
import OverallNPKCard from "./OverallNPKCard.jsx";

import TempHumidCard from "./TempHumidCard.jsx";
import PhCategoryCard from "./PhCategory.jsx";

import GrindingCard from "./GrindingCard.jsx";
import DryingCard from "./DryingCard.jsx";

const DashboardComponent = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <NPKCard className="col-span-12 lg:col-span-3" />
      <OverallNPKCard className="col-span-12 lg:col-span-9" />
      <TempHumidCard className="col-span-12 lg:col-span-4" />
      <PhCategoryCard className="col-span-12 lg:col-span-8" />
      <GrindingCard className="col-span-12 lg:col-span-6" />
      <DryingCard className="col-span-12 lg:col-span-6" />

      <div className="col-span-12 mt-5 flex justify-center gap-4">
        <div className="w-28 h-16 rounded-2xl flex items-center justify-center hover:brightness-90 transition-all duration-150 bg-[#83934D] cursor-pointer select-none active:scale-95">
          <p className="font-semibold text-[#fff] text-2xl">Start</p>
        </div>
        <div className="w-28 h-16 rounded-2xl flex items-center justify-center hover:brightness-90 transition-all duration-150 bg-[#44562F] cursor-pointer select-none active:scale-95">
          <p className="font-semibold text-[#E9DFB4] text-2xl">Stop</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
