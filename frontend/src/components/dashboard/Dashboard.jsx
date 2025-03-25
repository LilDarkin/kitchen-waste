import NPKCard from "./NPKCard";
import OverallNPKCard from "./OverallNPKCard.jsx";

import TempHumidCard from "./TempHumidCard.jsx";
import PhCategoryCard from "./PhCategory.jsx";

import GrindingCard from "./GrindingCard.jsx";
import DryingCard from "./DryingCard.jsx";

const DashboardComponent = () => {
    return (
        <div className="grid grid-cols-12 gap-5">
            <NPKCard className="col-span-12 lg:col-span-3"/>
            <OverallNPKCard className="col-span-12 lg:col-span-9"/>

            <TempHumidCard className="col-span-12 lg:col-span-4"/>
            <PhCategoryCard className="col-span-12 lg:col-span-8"/>

            <GrindingCard className="col-span-12 lg:col-span-6"/>
            <DryingCard className="col-span-12 lg:col-span-6"/>
        </div>
    )
}

export default DashboardComponent;