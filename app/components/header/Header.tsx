import React from "react";
import { FaMessage, FaBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="sticky top-0 bg-[#1f2937] z-10 flex justify-end p-3 border-b">
      <div className="max-w-fit flex items-center text-white gap-3">
        <FaMessage className="text-[20px]"/>
        <FaBell className="text-[20px]"/>
        <div className="flex gap-2 items-center">
          <FaUserCircle className="text-[20px]"/>
          <div className="flex flex-col">
            <span className="text-white text-[12px]">John Doe</span>
            <span className="text-white text-[12px]">role</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
