import React, { useState } from "react";
import Check from "app/assets/Check.svg";
import Halaman from "app/assets/Halaman.svg";

const SuggestionBox = () => {
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
        <img src={Check} alt="bulb" className="w-15 h-15 mb-2" />
        <div
          className="bg-[#E9DFB4] h-auto w-full rounded-[10px] flex flex-col items-center justify-center py-2 cursor-pointer mb-4"
          onClick={openModal}
        >
          <p className="font-bold text-[#512E2E] text-lg sm:text-xl">
            Suggestions
          </p>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-lg w-full max-w-[600px] p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#512E2E]">Suggestions</h2>
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
                <p className="text-[#83934D] font-bold text-lg">Methods</p>
              </div>
              <div>
                <ul className="list-decimal list-inside px-8">
                  <li>Top Dressing</li>
                  <li>Add to Topsoil Mix</li>
                  <li>Incorporate into Soil</li>
                </ul>
              </div>
              <div className="px-3 flex flex-row justify-start items-center gap-1">
                <img src={Halaman} alt="halaman" className="w-5 h-5 mb-1" />
                <p className="text-[#83934D] font-bold text-lg">
                  Amount of Soil
                </p>
              </div>
              <div>
                <ul className="list-decimal list-inside px-8">
                  <li>
                    Compost Mix Ratios:
                    <br />
                    <span className="pl-3">
                      5% compost mix -{">"} 19 parts soil to 1 part compost
                    </span>
                    <br />
                    <span className="pl-3">
                      20% compost mix -{">"} 4 parts soil to 1 part compost
                    </span>
                  </li>
                  <li>
                    Potted Plants:
                    <br />
                    <span className="pl-3">
                      Use 20-50% compost mix to help retain moiseture,
                      especially for containers that dry out quickly.
                    </span>
                  </li>
                  <li>
                    Vegetable Gardens:
                    <br />
                    <span className="pl-3">
                      Apply up to 1 inch of compost and till it to a depth of 5
                      inches, When using a shovel, apply 1/5 inch of compost per
                      inch of shovel depth.
                    </span>
                  </li>
                  <li>
                    Flower Gardens:
                    <br />
                    <span className="pl-3">
                      Use a 20% compost mix (4 parts soil to 1 part compost).
                    </span>
                    <br />
                    <span className="pl-3">
                      Alternatively, top-dress with 1/4 to 1/2 inch of compost.
                    </span>
                  </li>
                  <li>
                    New Trees and Shrubs:
                    <br />
                    <span className="pl-3">
                      Plant with a 10%T compost mix (9 parts soil to 1 part
                      compost).
                    </span>
                  </li>
                  <li>
                    Established Trees and Shrubs:
                    <br />
                    <span className="pl-3">
                      Top-dress with 1/4 to 1/2 inch of compost around the base,
                      extending to the drip line.
                    </span>
                  </li>
                  <li>
                    Established Lawns:
                    <br />
                    <span className="pl-3">
                      Top-dress with 1/8 to 1/4 inch of compost, ideally after
                      aerating.
                    </span>
                  </li>
                  <li>
                    Seeding New Lawns:
                    <br />
                    <span className="pl-3">
                      Apply 1 to 2 1/2 inches of compost and till it to a depth
                      of 6 inches before seeding.
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="list-decimal list-inside px-8">
                  <li>
                    Compost Mix Ratios:
                    <br />
                    <span className="pl-3">
                      5% compost mix -{">"} 19 parts soil to 1 part compost
                    </span>
                    <br />
                    <span className="pl-3">
                      20% compost mix -{">"} 4 parts soil to 1 part compost
                    </span>
                  </li>
                  <li>
                    Potted Plants:
                    <br />
                    <span className="pl-3">
                      Use 20-50% compost mix to help retain moiseture,
                      especially for containers that dry out quickly.
                    </span>
                  </li>
                  <li>
                    Vegetable Gardens:
                    <br />
                    <span className="pl-3">
                      Apply up to 1 inch of compost and till it to a depth of 5
                      inches, When using a shovel, apply 1/5 inch of compost per
                      inch of shovel depth.
                    </span>
                  </li>
                  <li>
                    Flower Gardens:
                    <br />
                    <span className="pl-3">
                      Use a 20% compost mix (4 parts soil to 1 part compost).
                    </span>
                    <br />
                    <span className="pl-3">
                      Alternatively, top-dress with 1/4 to 1/2 inch of compost.
                    </span>
                  </li>
                  <li>
                    New Trees and Shrubs:
                    <br />
                    <span className="pl-3">
                      Plant with a 10%T compost mix (9 parts soil to 1 part
                      compost).
                    </span>
                  </li>
                  <li>
                    Established Trees and Shrubs:
                    <br />
                    <span className="pl-3">
                      Top-dress with 1/4 to 1/2 inch of compost around the base,
                      extending to the drip line.
                    </span>
                  </li>
                  <li>
                    Established Lawns:
                    <br />
                    <span className="pl-3">
                      Top-dress with 1/8 to 1/4 inch of compost, ideally after
                      aerating.
                    </span>
                  </li>
                  <li>
                    Seeding New Lawns:
                    <br />
                    <span className="pl-3">
                      Apply 1 to 2 1/2 inches of compost and till it to a depth
                      of 6 inches before seeding.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="px-3 flex flex-row justify-start items-center gap-1">
                <img src={Halaman} alt="halaman" className="w-5 h-5 mb-1" />
                <p className="text-[#83934D] font-bold text-lg">
                  Number of times to put on soil
                </p>
              </div>
              <div>
                <ul className="list-decimal list-inside px-8">
                  <li>
                    Garden Beds:
                    <br />
                    <span className="pl-3">
                      Fully decomposed homemade compost: Apply to newly planted
                      or soon-to-be-planted beds.
                    </span>
                    <br />
                    <span className="pl-3">
                      Bagged compost: Add in early spring with a 1 to 2-inch
                      layer. Lightly rake in and let it settle for a couple of
                      weeks before planting.
                    </span>
                    <br />
                    <span className="pl-3">
                      Homemade or green, fibrous compost: Add in the fall to
                      decompose over the winter, ready for spring planting.
                    </span>
                  </li>
                  <li>
                    New Garden Beds
                    <br />
                    <span className="pl-3">
                      Double-digging compost into the soil creates loamy,
                      lighter soil. Only needs to be done once.
                    </span>
                  </li>
                  <li>
                    Established Gardens
                    <br />
                    <span className="pl-3">
                      Side dressing. Apply compost a few inches away from
                      plants. It provides mid-cycle nutrients, suppresses weeds,
                      and retains moisture.
                    </span>
                  </li>
                  <li>
                    New Gardens and Plants
                    <br />
                    <span className="pl-3">
                      Apply compost once during planting.
                    </span>
                  </li>
                  <li>
                    Established Plants and Lawns
                    <br />
                    <span className="pl-3">
                      Benefit from 1-2 applications per year, prefebrably in
                      spring or fall. It call be applied as top-dressing or a
                      soil amendment.
                    </span>
                  </li>
                  <li>
                    Potted Plants
                    <br />
                    <span className="pl-3">
                      Add compost when repotting or refreshing the potting mix. Do this every 1-2 years.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestionBox;
