"use client";

import { useAuth } from "@/app/context/AuthContext";
import SubHeading from "@/app/components/product/SubHeading";
import { useRouter } from "next/navigation";
import { useAccountNavigation } from "@/app/hooks/useVendorAccountNavigation";
import Logo from "/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header/Header";
const VendorDashboard = () => {
  const {
    renderContent,
    handleOptionClick,
    vendorDashboardOptions,
    vendorSelectedOption,
  } = useAccountNavigation();

  const { user, vendor } = useAuth();

  // if (!user && !vendor) {
  //   return null;
  // }

  return (
    <div className="flex min-h-screen text-white">
      <aside className="fixed h-screen max-w-fit bg-[#1f2937] shadow-md border-r z-20 overflow-auto scrollbar-thin scrollbar-thumb-[#1f2937] scrollbar-track-gray-100">
        <div className="w-56">
          <div className="p-5">
            <Link className="text-5xl font-bold" href="/">
              <Image src={Logo} alt="Porpop Logo " />
            </Link>
          </div>
          <div className="h-full">
            <div>
              <ul className="flex flex-col">
                {vendorDashboardOptions.map((option) => (
                  <li
                    key={option.key}
                    onClick={() => handleOptionClick(option.key)}
                    className={`p-4 cursor-pointer text-sm ${
                      vendorSelectedOption === option.key
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
        </div>
      </aside>

      {/* Main Content */}
      {/* Toggle between the vendor form and the sidebar content. */}
      <div className="flex-1 ml-56">
        <Header />
        <div className="bg-[#111827] h-full">
          <div className="p-8 max-w-[100rem] mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
