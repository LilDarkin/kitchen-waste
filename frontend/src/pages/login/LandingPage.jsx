import logo from "../../assets/nutricare.svg";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#83934D] text-white">
      <img src={logo} alt="Nutricare Logo" className="w-[253px] h-[212px] mb-4" />
      <div className="text-7xl font-bold ">NutriCycle</div>
    </div>
  );
};

export default LandingPage;
