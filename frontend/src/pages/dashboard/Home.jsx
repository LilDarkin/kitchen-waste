import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-9 bg-[#E9DFB4] flex flex-col items-center">
      <div className="max-w-[1308px]  bg-[#B7C88D] p-6 rounded-[20px] shadow-lg border-black border-2">
        <div className="flex flex-col gap-0">
          <label className="text-2xl font-bold text-[#000000]">
            Terms of Service
          </label>
          <label className="text-[#8E8E8E] text-[15px] font-light mt-2">
            Last updated on March 2025
          </label>
          <label className="text-black text-[12px] font-normal mt-2">
            Welcome to NutriCycle! By using our platform, you agree to the
            following Terms of Service. Please read them carefully.
          </label>
        </div>
        <h2 className="text-[17px] font-bold mt-5">Acceptance of Terms</h2>
        <p className="text-[#4C4848] text-[12px] font-normal">
          By signing up for NutriCycle, you acknowledge that you have read,
          understood, and agreed to these Terms of Service. If you do not agree,
          please do not use our services.
        </p>
        <h2 className="text-[17px] font-bold mt-5">Description of Service</h2>
        <p className="text-[#4C4848] text-[12px] font-normal">
          NutriCycle provides an IoT-based monitoring system that tracks compost
          nutrient levels, including Nitrogen, Phosphorus, and Potassium, along
          with temperature, humidity, and pH. Users can access real-time data
          through an LCD display and a mobile app. Our system is designed for
          household and small market owners managing fruit and vegetable waste
          composting.
        </p>
        <h2 className="text-[17px] font-bold mt-5">User Accounts</h2>
        <p className="text-[#4C4848] text-[12px] font-normal">
          Users must provide a valid email for authentication via Supabase. They
          are responsible for maintaining the confidentiality of their login
          credentials. Any unauthorized access or security breaches must be
          reported immediately.
        </p>
        <h2 className="text-[17px] font-bold mt-5">Data Collection & Usage</h2>
        <p className="text-[#4C4848] text-[12px] font-normal">
          Sensor data, including nutrient levels, temperature, humidity, and pH,
          is stored in InfluxDB for real-time processing. Personal data, such as
          email addresses, is securely stored in Supabase for authentication
          purposes. All data is used solely for monitoring and improving
          composting processes.
        </p>
        <h2 className="text-[17px] font-bold mt-5">User Responsibilities</h2>
        <p className="text-[#4C4848] text-[12px] font-normal">
          Users must ensure their IoT sensors are properly maintained for
          accurate readings. They agree to comply with local waste management
          regulations. The platform should not be used for any illegal or
          unauthorized purposes.
        </p>
        <h2 className="text-[17px] font-bold mt-5">Service Availability</h2>
        <p className="text-[#4C4848] text-[12px] font-normal">
          We strive to keep NutriCycle operational at all times. However, we do
          not guarantee uninterrupted service due to potential system
          maintenance, technical issues, or server downtimes.
        </p>
        <h2 className="text-[17px] font-bold mt-5">Data Privacy & Security</h2>
        <p className="text-[#4C4848] text-[12px] font-normal">
          NutriCycle respects your privacy and prioritizes data security. We
          collect personal information, including email addresses for account
          authentication, which are stored in Supabase. Additionally, we gather
          environmental data such as compost nutrient levels, temperature,
          humidity, and pH, stored in InfluxDB for real-time monitoring. The
          data collected is used to provide real-time compost monitoring
          services, authenticate and manage user accounts, and enhance platform
          functionality.
        </p>
        <p className="text-[#4C4848] text-[12px] font-normal mt-2">
          Supabase secures user authentication data, while InfluxDB processes
          real-time sensor data. We implement encryption and security protocols
          to protect all collected data. NutriCycle does not sell, rent, or
          share personal data with third parties. However, our team may access
          data for system maintenance and improvements, and legal authorities
          may request access if required by law. Users have the right to request
          access to their stored data, delete their accounts and associated
          personal data, and correct any inaccuracies.
        </p>

        <p className="text-[#4C4848] text-[12px] font-normal mt-2">
          NutriCycle does not use tracking cookies for advertising; however,
          server logs may collect usage data for analytics and system
          monitoring. We may update this policy as needed, and users will be
          notified of significant changes. For any questions, contact us at
          tokiyakokak@gmail.com. By using NutriCycle, you agree to this policy.
        </p>

        <h2 className="text-[17px] font-bold mt-5">Changes to Terms</h2>
        <p className="text-[#4C4848] text-[12px] font-normal">
          We may update these Terms from time to time. Continued use of
          NutriCycle after updates constitutes acceptance of the revised Terms.
        </p>
        {/* Agreement Checkbox */}
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="agree"
            className="w-5 h-5 text-green-500"
          />
          <label
            htmlFor="agree"
            className="ml-2 tmt-4 text-black text-base font-light"
          >
            I have read and agree to the Terms of Service.
          </label>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="acknowledge"
            className="w-5 h-5 text-green-500"
          />
          <label
            htmlFor="acknowledge"
            className="ml-2 tmt-4 text-black text-base font-light"
          >
            I acknowledge that continued use constitutes acceptance.
          </label>
        </div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-[#EFBFB3] text-black font-xs py-2 px-6 rounded-lg hover:bg-[#d99e9a]"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Home;
