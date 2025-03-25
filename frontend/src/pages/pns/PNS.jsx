import React, { useState } from "react";
import YesModal from "app/components/dashboard/YesModal";
import NoModal from "app/components/dashboard/NoModal";

const PNS = () => {
  const [isYesModalOpen, setYesModalOpen] = useState(false);
  const [isNoModalOpen, setNoModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      {/* Title Box */}
      <div className="border rounded-[10px] max-w-[485px] w-full min-h-[225px] bg-white flex flex-col justify-between items-center text-lg sm:text-xl font-bold p-4">
        {/* Top Box - Does NOT meet PNS Standards */}
        <div className="border rounded-[10px] max-w-[446px] w-full min-h-[144px] bg-[#44562F] text-[#E9DFB4] flex justify-center items-center text-lg sm:text-xl font-bold text-center px-2">
          Does NOT meet PNS Standards.
        </div>

        {/* Bottom Text - Do you want to continue? */}
        <p className="mt-4 text-center">Do you want to continue?</p>
      </div>

      {/* Yes & No Buttons */}
      <div className="flex flex-col gap-2 w-full max-w-[268px]">
        <button
          onClick={() => setYesModalOpen(true)}
          className="w-full min-h-[49px] cursor-pointer bg-[#FDA4A5] text-black font-bold rounded-lg text-lg"
        >
          Yes
        </button>
        <button
          onClick={() => setNoModalOpen(true)}
          className="w-full min-h-[49px] cursor-pointer bg-[#E9DFB4] text-black font-bold rounded-lg text-lg"
        >
          No
        </button>
      </div>

      {/* Modals */}
      <YesModal
        isOpen={isYesModalOpen}
        onClose={() => setYesModalOpen(false)}
        title="WARNING"
      >
        The composted soil can still be used for plants; however, it will not significantly contribute in terms of nutrients.
      </YesModal>

      <NoModal
        isOpen={isNoModalOpen}
        onClose={() => setNoModalOpen(false)}
        title="ACTION REQUIRED"
      >
        Please get the soil that doesn’t meet the PNS standards and put it back on top, then mix it with more kitchen waste.
      </NoModal>
    </div>
  );
};

export default PNS;
