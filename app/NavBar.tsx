"use client"

import Image from 'next/image';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';
import { RxCaretDown } from 'react-icons/rx';
import { FaTimes } from 'react-icons/fa';

const Navbar = () => {

  const [ showSidebar, setShowSidebar ] = useState(false)

  return (
    <div className="absolute top-0 w-full z-10 padding-x py-4">
      {/* Left Icon */}
      <div className="maxW flex items-center justify-between bg-transparent">

      <div className="flex items-center">
        <Image
          src="/Images/logo.png"
          alt="logo"
          width={160}
          height={47}
          // className="w-20 h-10"
        />
      </div>

      {/* Center Links */}
      <ul className="hidden lg:flex space-x-6 items-center text-white">
        <li className="relative group">
          <button className="hover:text-gray-300 focus:outline-none flex items-center gap-2">
            Solutions <RxCaretDown fontSize="20px" />
          </button>
          {/* Dropdown */}
          <div className="absolute left-0 mt-2 hidden w-40 bg-white text-gray-800 rounded-md shadow-lg group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Option 1
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Option 2
            </a>
          </div>
        </li>
        <li><a href="/filters" className="hover:text-gray-300">Product Filters</a></li>
        <li><a href="/pricing" className="hover:text-gray-300">Pricing</a></li>
        <li><a href="/contact" className="hover:text-gray-300">Contact Us</a></li>
        <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
      </ul>

      {/* Right Buttons */}
      <div className="flex space-x-4 items-center">
        <button className="hidden md:block px-4 py-2 bg-transparent text-white rounded-md">
          Login
        </button>
        <button className="hidden md:block px-4 py-2 bg-transparent hover:bg-[#A4CD3A] text-white rounded-full border-2 border-[#A4CD3A] shrink-0">
          Sign Up
        </button>

        <div className='shrink-0'>

        <MdMenu fontSize="30px" color="white" className="lg:hidden" onClick={() => setShowSidebar(!showSidebar)} />
        </div>
      </div>

      <div
        className={`fixed top-0 px-4 right-0 w-1/2 h-full bg-white lg:hidden flex-col justify-between py-8 border-l z-30 duration-300 ease-in transition-all ${showSidebar ? "flex" : "hidden"} z-50`}
      >
        <div className="">
        <div className="flex justify-end mb-4">
          <FaTimes fontSize="30px" color="black" onClick={() => setShowSidebar(false)} />
        </div>
        <ul className="flex flex-col gap-6 items-center text-black">
        <li className="relative group">
          <button className="hover:text-gray-300 focus:outline-none flex items-center gap-2">
            Solutions <RxCaretDown fontSize="20px" />
          </button>
          {/* Dropdown */}
          <div className="absolute left-0 mt-2 hidden w-40 bg-white text-gray-800 rounded-md shadow-lg group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Option 1
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Option 2
            </a>
          </div>
        </li>
        <li><a href="/filters" className="hover:text-gray-300">Product Filters</a></li>
        <li><a href="/pricing" className="hover:text-gray-300">Pricing</a></li>
        <li><a href="/contact" className="hover:text-gray-300">Contact Us</a></li>
        <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
      </ul>

      <div className="text-center mt-2 md:hidden">

        <div className="text-center">
        <button className="px-4 py-2 bg-transparent text-[#A4CD3A] rounded-md">
          Login
        </button>
        </div>
        <div className="text-center">

        <button className="px-4 py-2 bg-transparent hover:bg-[#A4CD3A] text-[#A4CD3A] rounded-full border-2 border-[#A4CD3A] shrink-0">
          Sign Up
        </button>
        </div>
      </div>
        </div>
    </div>
      </div>
    </div>
  );
};

export default Navbar;
