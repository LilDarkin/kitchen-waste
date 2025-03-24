import React from "react";
import { X } from "lucide-react"; // Import X icon from Lucide

const YesModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm ">
      {/* Outer Bigger Border */}
      <div className="border border-gray-600 rounded-xl p-8 w-[460px] bg-[#83934D] flex justify-center items-center shadow-lg relative">
        {/* Inner Modal */}
        <div className="border border-gray-500 rounded-lg p-6 w-[400px] text-center bg-[#B7C88D] shadow-md relative">
          {/* Close Button (X) in the top-right corner */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-700 hover:text-red-600"
          >
            <X size={24} />
          </button>

          <h2 className="text-xl font-bold text-red-600 mb-4">{title}</h2>
          <p className="text-white">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default YesModal;
