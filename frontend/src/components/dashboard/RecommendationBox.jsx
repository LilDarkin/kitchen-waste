import React, { useState } from "react";
import Bulb from "app/assets/Bulb.svg";
import Halaman from "app/assets/Halaman.svg";

const RecommendationBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="border rounded-[10px] max-w-[250px] w-full min-h-[200px] h-auto bg-[#8E8E8EC4] text-[#83934D] flex flex-col justify-end items-center gap-7 pt-4 px-4 text-center">
        <img src={Bulb} alt="bulb" className="w-20 h-20 mb-2" />
        <div
          className="bg-[#E9DFB4] h-auto w-full rounded-[10px] flex flex-col items-center justify-center py-2 cursor-pointer mb-4"
          onClick={openModal}
        >
          <p className="font-bold text-[#512E2E] text-lg sm:text-xl">
            Recommendations
          </p>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-lg max-w-[600px] w-full p-6 relative overflow-auto min-h-[90vh]">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#512E2E]">
                Recommendations for Kitchen Waste Composting
              </h2>
              <button
                className=" text-[#44562F] font-bold hover:text-gray-800 cursor-pointer"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="px-3 flex flex-row justify-start items-center gap-1">
                <img src={Halaman} alt="halaman" className="w-5 h-5 mb-1" />
                <p className="text-[#83934D] font-bold text-lg">Compostable Items:</p>
              </div>
              <div>
                <ul className="list-decimal list-inside px-8">
                  <li>
                    Fruit and vegetable scraps: <br />
                    <span className="pl-3">
                      Peels, cores, rinds, and inedible parts.
                    </span>
                  </li>
                  <li>
                    Tea bags, coffee grounds, and filters: <br />
                    <span className="pl-3">
                      Remove staples or synthetic materials before composting.
                    </span>
                  </li>
                  <li>Crushed eggshells</li>
                  <li>
                    Nutshells: <br />
                    <span className="pl-3">
                      From walnuts, almonds, or pistachios, <br />{" "}
                      <span className="pl-3">
                        Avoid Treated or painted nuts.
                      </span>
                    </span>
                  </li>
                  <li>
                    Grass clippings: <br />
                    <span className="pl-3">Cut flowers and houseplants</span>
                  </li>
                  <li>Herbs and spices</li>
                </ul>
              </div>
              <div className="px-3 flex flex-row justify-start items-center gap-1">
                <img src={Halaman} alt="halaman" className="w-5 h-5 mb-1" />
                <p className="text-[#E43535] font-bold text-lg">Avoid Adding:</p>
              </div>
              <div>
                <ul className="list-decimal list-inside px-8">
                  <li>
                    Citrus fruits (can slow down decomposition and harm
                    <br />
                    <span className="pl-3">compost microbes).</span>
                  </li>
                  <li>Odorous foods like onions and garlic.</li>
                  <li>
                    Meat and dairy products (can attract pests and create
                    odors).
                  </li>
                  <li>
                    Greasy foods (slow decomposition and reduce aeration).
                  </li>
                  <li>Bones (take too long to break down).</li>
                  <li>Pet waste (may contain harmful pathogens).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationBox;
