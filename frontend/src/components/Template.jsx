import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NeedHelp from "./NeedHelp.jsx";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Template = ({ hasNavigation = false }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const token = localStorage.getItem("token");

  if (!token) {
    return navigate("/login");
  }

  const user = jwtDecode(token);
  console.log(user);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-[#E9DFB4] min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-col w-full p-4 sm:p-6 md:p-12 flex-grow">
        {hasNavigation ? (
          <main className="w-full bg-green-100/50 mx-0 sm:mx-2 md:mx-4 my-2 md:my-4 rounded-lg flex-grow">
            <Outlet />
          </main>
        ) : (
          <div className="w-full p-4 sm:p-6 md:p-10 border-2 rounded-2xl bg-[#B7C88D] flex-grow">
            <div className="text-white mb-3 md:mb-5 font-semibold text-lg md:text-xl">
              Hello, {user?.name}!
            </div>
            <div className="flex flex-col md:flex-row h-full">
              {/* On medium screens and larger, sidebar will be on the left */}
              <div className="md:block hidden">
                <Sidebar isOpen={sidebarOpen} />
              </div>
              <main className="w-full mx-0 sm:mx-2 md:mx-4 my-2 md:my-4 rounded-lg flex-grow">
                <Outlet />
              </main>
              {/* On mobile, sidebar will appear at the bottom */}
              <div className="block md:hidden">
                <Sidebar isOpen={sidebarOpen} />
              </div>
            </div>
          </div>
        )}

        {/* help */}
        <NeedHelp />
      </div>

      {/* height box */}
      <div className="h-20 block md:hidden"></div>
    </div>
  );
};

export default Template;
