import NPKCard from "./NPKCard";
import OverallNPKCard from "./OverallNPKCard.jsx";
import TempHumidCard from "./TempHumidCard.jsx";
import PhCategoryCard from "./PhCategory.jsx";
import GrindingCard from "./GrindingCard.jsx";
import DryingCard from "./DryingCard.jsx";

const DashboardComponent = () => {
  const sendCommand = (command) => {
    fetch(`http://192.168.165.112:8000/control/${command}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ FastAPI response:", data);
      })
      .catch((err) => {
        console.error("❌ Failed to send command:", err);
      });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-5">
        {/* NPK Section */}
        <NPKCard className="col-span-12 lg:col-span-4 h-full" />
        <OverallNPKCard className="col-span-12 lg:col-span-8 h-full" />

        {/* Environmental Section */}
        <TempHumidCard className="col-span-12 md:col-span-6 lg:col-span-4 h-full" />
        <PhCategoryCard className="col-span-12 md:col-span-6 lg:col-span-8 h-full" />

        {/* Machine Operation Section */}
        <GrindingCard className="col-span-12 md:col-span-6 h-full" />
        <DryingCard className="col-span-12 md:col-span-6 h-full" />

        {/* Start/Stop Buttons */}
        <div className="col-span-12 mt-6 flex justify-center gap-6">
          <div
            className="w-28 h-16 rounded-2xl flex items-center justify-center hover:brightness-90 transition-all duration-150 bg-[#83934D] cursor-pointer select-none active:scale-95 shadow-lg"
            onClick={() => sendCommand("START")}
          >
            <p className="font-semibold text-white text-2xl">Start</p>
          </div>
          <div
            className="w-28 h-16 rounded-2xl flex items-center justify-center hover:brightness-90 transition-all duration-150 bg-[#44562F] cursor-pointer select-none active:scale-95 shadow-lg"
            onClick={() => sendCommand("STOP")}
          >
            <p className="font-semibold text-[#E9DFB4] text-2xl">Stop</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
