import NPKCard from "./NPKCard";
import OverallNPKCard from "./OverallNPKCard";

import TempHumidCard from "./TempHumidCard";
import PhCategoryCard from "./PhCategory";

import GrindingCard from "./GrindingCard";
import DryingCard from "./DryingCard";

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