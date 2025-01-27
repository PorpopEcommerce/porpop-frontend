import { useState } from "react";
import { FaBell, FaCalendar, FaCaretDown } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { FiMenu, FiSearch, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import Pill from "./Pill";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function ({ toggleSidebar }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (!e.currentTarget.contains(e.target as Node)) setMenuOpen(false);
  };

  return (
    <nav className="flex gap-4 justify-between md:items-center bg-dark-800 p-4 shadow sticky top-0 z-50">
      <div className="flex lg:items-center lg:hidden">
        <div className="h-9 flex items-center">
          <button onClick={toggleSidebar} className="text-gray-600">
            <FiMenu size={24} />
          </button>
        </div>
      </div>
      <div className="flex-grow flex gap-4 lg:justify-between justify-end items-center flex-wrap">
        <div className="order-2 md:order-1 flex items-center gap-3 bg-transparent px-2">
          <FiSearch className="text-dark-200 text-xl" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm placeholder-dark-200 text-white w-32 sm:w-64"
          />
        </div>

        <div className="order-1 md:order-2 flex items-center md:space-x-8 space-x-6 text-dark-200">
          <div>
            <FaCalendar size={20} />
          </div>
          <div className="relative">
            <div className="absolute -top-2 -right-2">
              <Pill value="2" />
            </div>
            <FaBell size={20} />
          </div>
          <div className="relative">
            <div className="absolute -top-2 -right-2">
              <Pill value="2" />
            </div>
            <FaEnvelope size={20} />
          </div>
          <Image
            src="/Images/dashboard/usa.png"
            width={28}
            height={28}
            alt="Profile"
            className="rounded-full"
          />
          <div className="relative" onClick={handleOutsideClick}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Image
                src="/Images/dashboard/profile.png"
                width={32}
                height={32}
                alt="Profile"
                className="rounded-full"
              />
              <div className="ml-2">
                <p className="text-sm text-white hidden md:block">John Doe</p>
                <p className="text-sm text-white md:hidden">JD</p>
                <p className="text-xs text-grey-300">Manager</p>
              </div>
              <FaCaretDown className="text-dark-200 ml-2" />
            </div>
            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <ul className="py-2 text-sm">
                  <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                    Profile
                  </li>
                  <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                    Settings
                  </li>
                  <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
