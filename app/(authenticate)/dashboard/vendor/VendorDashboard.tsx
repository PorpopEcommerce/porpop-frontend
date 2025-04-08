"use client";

import { useAccountNavigation } from "@/app/hooks/useVendorAccountNavigation";
import Header from "@/app/components/header/Header";
import Logo from "/public/images/logo.png";
import { CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
const VendorDashboard = () => {
  const {
    renderContent,
    handleOptionClick,
    vendorDashboardOptions,
    vendorSelectedOption,
  } = useAccountNavigation();

  const [menuDisplay, setMenuDisplay] = useState(false);

  useEffect(() => {
    if (menuDisplay) {
      // Disable scrolling when a modal is active
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling when no modal is active
      document.body.style.overflow = "auto";
    }
  }, [menuDisplay]);



  return (
    <div className="flex min-h-screen text-white">
      <aside className="hidden lg:block fixed h-screen max-w-fit bg-[#1f2937] shadow-md border-r z-20 overflow-auto scrollbar-thin scrollbar-thumb-[#1f2937] scrollbar-track-gray-100">
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
      <div className="flex-1 lg:ml-56">
        <div className="flex">
          <div
            className="lg:hidden cursor-pointer bg-[#1f2937] border-b p-3 flex items-center gap-1 text-xl font-normal text-white hover:text-zinc-500"
            onClick={() => setMenuDisplay(!menuDisplay)}
          >
            <CiMenuBurger />
          </div>
          <div className="flex-1">
            <Header />
          </div>
        </div>
        <div className="bg-[#111827] h-full">
          <div className="p-4 lg:p-8 max-w-[100rem] mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* toogleMenu on small view */}
      {menuDisplay && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setMenuDisplay(!menuDisplay)}
          >
            <div
              className="relative w-[50%] h-full bg-[#1f2937]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4">
                <Link className="text-5xl font-bold" href="/">
                  <Image src={Logo} alt="Porpop Logo " />
                </Link>
                <button onClick={() => setMenuDisplay(!menuDisplay)}>
                  <FaTimes className="text-xl text-white" />
                </button>
              </div>
              <div className="h-[90%] overflow-auto scrollbar-thin scrollbar-thumb-[#1f2937] scrollbar-track-gray-100">
                <div className="h-fit py-2">
                  <ul className="flex flex-col">
                    {vendorDashboardOptions.map((option) => (
                      <li
                        key={option.key}
                        onClick={() => {
                          handleOptionClick(option.key);
                          setMenuDisplay(!menuDisplay);
                        }}
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
          </div>
        </>
      )}
    </div>
  );
};

export default VendorDashboard;
