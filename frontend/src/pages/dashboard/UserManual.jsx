import { useNavigate } from "react-router-dom";

const UserManual = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col p-10 bg-[#B7C88D] rounded-lg min-h-screen">
      <div className="flex flex-row justify-between">
        <div className="text-[#512E2E] bg-[#EFBFB4] w-full max-w-[200px] p-1 rounded-lg font-bold text-[15px] hover:text-[#7a4949] transition-colors text-center">
          USER MANUAL
        </div>
        <div onClick={() => navigate("/dashboard")} className="text-[#512E2E] bg-[#EFBFB4] w-full max-w-[100px] p-1 rounded-lg font-bold text-[15px] hover:text-[#7a4949] transition-colors text-center cursor-pointer">
          BACK
        </div>
      </div>
      <h1 className="font-bold text-[20px] mt-4 text-white text-center">
        Tips & Tricks para Sumakses kasi step by the step plala siya
      </h1>
      <p className="mt-4 font-normal text-[15px]">
        Sensor data, including nutrient levels, temperature, humidity, and pH,
        is stored in InfluxDB for real-time processing. Personal data, such as
        email addresses, is securely stored in Supabase for authentication
        purposes. All data is used solely for monitoring and improving
        composting processes.
      </p>
    </div>
  );
};

export default UserManual;
