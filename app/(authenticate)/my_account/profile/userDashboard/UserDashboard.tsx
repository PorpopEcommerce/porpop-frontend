"use client";

import { useAuth } from "@/app/context/AuthContext";
import SubHeading from "@/app/components/product/SubHeading";
import { useAccountNavigation } from "@/app/hooks/useUserAccountNavigation";
import Logo from "/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header/Header";

const UserDashboard = () => {
  const { renderContent, handleOptionClick, dashboardOptions, selectedOption } =
    useAccountNavigation();

  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed h-screen max-w-fit bg-[#1f2937] shadow-md border-r z-20 overflow-auto scrollbar-thin scrollbar-thumb-[#1f2937] scrollbar-track-gray-100">
        <div className="w-56">
          <div className="p-5">
            <Link className="text-5xl font-bold" href="/">
              <Image src={Logo} alt="Porpop Logo " />
            </Link>
          </div>
          <div className="h-full">
            <ul className="flex flex-col text-white">
              {dashboardOptions.map((option) => (
                <li
                  key={option.key}
                  onClick={() => handleOptionClick(option.key)}
                  className={`p-4 cursor-pointer ${
                    selectedOption === option.key
                      ? "bg-[#a4cd3a] text-white"
                      : "hover:bg-[#a4cd3a]"
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      {/* Toggle between the vendor form and the sidebar content. */}
      <div className="flex-1 ml-56">
        <Header />
        <div className="bg-[#111827] h-full">
          <div className="p-8 max-w-[100rem] mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
