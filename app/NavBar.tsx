"use client";

import Image from "next/image";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavAccountComponent from "./components/nav/NavAccountComponent";
import { useAuth } from "./context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { user } = useAuth();

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      className={`${
        isHome ? "absolute top-0" : "bg-[#255200]"
      } w-full z-10 padding-x py-4`}
    >
      {/* Left Icon */}
      <div className="maxW flex items-center justify-between bg-transparent">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/Images/logo.png"
              alt="logo"
              width={160}
              height={47}
              // className="w-20 h-10"
            />
          </Link>
        </div>

        {/* Center Links */}
        <ul className="hidden lg:flex space-x-6 items-center text-white">
          <li className="relative group">
            <button className="hover:text-gray-300 focus:outline-none flex items-center gap-2">
              Solutions <RxCaretDown fontSize="20px" />
            </button>
            {/* Dropdown */}
            <div className="absolute left-0 pt-2 hidden group-hover:block hover:block">
              <div className="w-40 overflow-hidden bg-white text-gray-800 rounded-md shadow-lg">
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Option 1
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Option 2
                </Link>
              </div>
            </div>
          </li>
          <li>
            <Link href="/filters" className="hover:text-gray-300">
              Product Filters
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-gray-300">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-gray-300">
              Blog
            </Link>
          </li>
        </ul>

        {/* Right Buttons */}
        <div className="flex space-x-6 items-center">
          {user ? (
            <NavAccountComponent />
          ) : (
            <Link href="/login_signin">
              <button className="hidden md:block px-4 py-2 bg-transparent hover:bg-[#A4CD3A] text-white rounded-full border-2 border-[#A4CD3A]">
                Login
              </button>
            </Link>
          )}

          <div className="relative">
            <FaShoppingCart
              fontSize="30px"
              color="white"
              className="cursor-pointer hover:opacity-80 transitionItem"
            />

            <div className="absolute w-1 h-1 bg-red-500 rounded-full top-0 left-0 skew-y-12"></div>
          </div>

          <div className="shrink-0">
            <MdMenu
              fontSize="30px"
              color="white"
              className="lg:hidden cursor-pointer"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
        </div>

        <div
          className={`fixed top-0 px-4 right-0 w-1/2 h-full bg-white lg:hidden flex-col justify-between py-8 border-l z-30 duration-300 ease-in transition-all ${
            showSidebar ? "flex" : "hidden"
          } z-50`}
        >
          <div className="">
            <div className="flex justify-end mb-4">
              <FaTimes
                fontSize="30px"
                className="cursor-pointer hover:text-red-400 transitionItem text-red-500"
                onClick={() => setShowSidebar(false)}
              />
            </div>
            <ul className="flex flex-col gap-6 items-center text-black">
              <li className="relative group">
                <button className="hover:text-gray-500 focus:outline-none flex items-center gap-2">
                  Solutions <RxCaretDown fontSize="20px" />
                </button>
                {/* Dropdown */}
                <div className="absolute -left-8 pt-2 hidden group-hover:block hover:block">
                  <div className="w-40 overflow-hidden bg-white text-gray-800 rounded-md shadow-lg">
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setShowSidebar(false)}
                    >
                      Option 1
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setShowSidebar(false)}
                    >
                      Option 2
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/filters"
                  className="hover:text-gray-500"
                  onClick={() => setShowSidebar(false)}
                >
                  Product Filters
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-gray-500"
                  onClick={() => setShowSidebar(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-500"
                  onClick={() => setShowSidebar(false)}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-gray-500"
                  onClick={() => setShowSidebar(false)}
                >
                  Blog
                </Link>
              </li>
            </ul>

            <div className="text-center mt-6 md:hidden">
              <div className="text-center">
                <Link href="/login_signin">
                  <button
                    className="px-8 py-2 bg-transparent text-[#A4CD3A] hover:text-gray-500 rounded-full border-2 border-[#A4CD3A]"
                    onClick={() => setShowSidebar(false)}
                  >
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <div className="md:w-[475px] w-full border border-[#C3C3C3] rounded-full flex items-center overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent py-2 px-4 flex-1 placeholder:text-[#C3C3C3] text-[#C3C3C3] focus:outline-none"
          />
          <div className="bg-[#C3C3C3] px-4 h-full flex items-center shrink-0">
            <FaSearch fontSize="20px" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
