import { useNavigate } from "react-router-dom";

const UserManual = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-10 bg-[#B7C88D] rounded-lg min-h-screen">
      <div className="flex flex-row justify-between">
        <div className="text-[#512E2E] bg-[#EFBFB4] w-full max-w-[200px] p-1 rounded-lg font-bold text-[15px] hover:text-[#7a4949] transition-colors text-center">
          USER MANUAL
        </div>
        <div
          onClick={() => navigate("/dashboard")}
          className="text-[#512E2E] bg-[#EFBFB4] w-full max-w-[100px] p-1 rounded-lg font-bold text-[15px] hover:text-[#7a4949] transition-colors text-center cursor-pointer"
        >
          BACK
        </div>
      </div>
      <h1 className="font-bold text-[20px] mt-4 text-[#44562F]">
        A Low-Cost IoT-Based Composting and Soil Nutrient Monitoring System
        Using Kitchen Waste
      </h1>
      <span className="text-[#83934D] font-bold text-sm">
        Version: 1.0 Date: April 4, 2025
      </span>

      <ul className="list-decimal list-inside mt-4 text-black font-bold text-[15px]">
        <li className="mb-3">
          INTRODUCTION
          <p className="pl-3 font-normal">
            The NutriCycle System is an IoT-based project designed to monitor
            soil nutrients, temperature, humidity, and pH levels during
            composting. It consists of hardware components (ESP32, sensors,
            RPi4B) and a web-based software interface for real-time monitoring.
          </p>
        </li>
        <li className="mb-3">
          {" "}
          SETTING UP THE SYSTEM
          <ul className="mt-2 text-black font-normal text-[15px]">
            <li className="pl-3 font-bold">
              2.1 HARDWARE SETUP
              <ul className="list-disc list-inside font-normal">
                <li className="pl-3">
                  Connect the DHT22, NPK, and pH sensors to the ESP32 as per
                  wiring diagram.
                </li>
                <li className="pl-3">
                  Power on the ESP32 and ensure it connects to WiFi.
                </li>
                <li className="pl-3">
                  Connect RPi4B to power and ensure it’s on the same network.
                </li>
                <li className="pl-3">
                  Verify MQTT broker is running on RPi4B.
                </li>
              </ul>
            </li>
            <li className="pl-3 font-bold">
              2.2 SOFTWARE SETUP
              <ul className="list-disc list-inside font-normal">
                <li className="pl-3">
                  Access the NutriCycle website at nutricycle.site.
                </li>
                <li className="pl-3">
                  Log in using your registered email and password
                </li>
                <li className="pl-3">
                  Confirm data flow from ESP32 to RPi4B and website.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="mb-3">
          USING THE NUTRICYCLE SYSTEM
          <ul className="font-normal">
            <li className="pl-3 font-bold">
              3.1 POWERING ON AND INITIALIZING
              <ul className="list-disc list-inside font-normal">
                <li className="pl-3">Power on the ESP32 and RPi4B.</li>
                <li className="pl-3">
                  The LCD should display initialization messages.
                </li>
              </ul>
            </li>
            <li className="pl-3 font-bold">
              3.2 MONITORING DATA ON THE LCD
              <ul className="list-disc list-inside font-normal">
                <li className="pl-3">
                  The LCD shows real-time NPK, pH, temperature, and humidity
                  values.
                </li>
              </ul>
            </li>
            <li className="pl-3 font-bold">
              3.3 USING THE WEBSITE INTERFACE
              <ul className="list-disc list-inside font-normal">
                <li className="pl-3">Log in to the NutriCycle website.</li>
                <li className="pl-3">
                  Access the Dashboard to view real-time data and graphs.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="mb-3">
          TROUBLESHOOTING
          <ul className="list-disc list-inside font-normal">
            <li className="pl-3 font-normal">
              No Data on LCD: Ensure sensors are connected properly.
            </li>
            <li className="pl-3 font-normal">
              Website Data Not Updating: Check ESP32 and RPi4B network
              connection.
            </li>
            <li className="pl-3 font-normal">
              Cannot Log in: Ensure correct email and password.
            </li>
          </ul>
        </li>
        <li className="mb-3">
          FREQUENTLY ASKED QUESTIONS (FAQ)
          <ul className="list-decimal list-inside font-normal">
            <li className="pl-3 font-normal">
              How often is data updated? Data is updated in real-time.
            </li>
            <li className="pl-3 font-normal">
              What should I do if the LCD is blank? Check power supply and
              wiring.
            </li>
          </ul>
        </li>
        <li className="mb-3">
          MAINTENANCE AND CARE
          <ul className="list-disc list-inside font-normal">
            <li className="pl-3 font-normal">
              Regularly clean sensors to avoid buildup.
            </li>
            <li className="pl-3 font-normal">
              Ensure components are protected from moisture.
            </li>
          </ul>
        </li>
        <li className="mb-3">
          TECHNICAL SPECIFICATIONS
          <ul className="list-disc list-inside font-normal">
            <li className="pl-3 font-normal">
              <span className="font-semibold">ESP32:</span> WiFi, Bluetooth,
              GPIO support
            </li>
            <li className="pl-3 font-normal">
              <span className="font-semibold">Sensors:</span> DHT22, NPK, pH
              sensor
            </li>
            <li className="pl-3 font-normal">
              <span className="font-semibold">RPi4B:</span> Quad-core CPU, 4GB
              RAM
            </li>
          </ul>
        </li>
        <li className="mb-3">
          CONTACT SUPPORT
          <ul className="list-disc list-inside font-normal">
            <li className="pl-3 font-normal">
              <span className="font-semibold">Email:</span>{" "}
              tokiyakokak@gmail.com
            </li>
            <li className="pl-3 font-normal">
              <span className="font-semibold">Phone:</span> 09060064870
            </li>
            <li className="pl-3 font-normal">
              <span className="font-semibold">Website:</span> nutricycle.site
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default UserManual;
