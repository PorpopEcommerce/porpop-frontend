import { useState } from 'react';

const Navbar = () => {
  return (
    <div className="relative bg-transparent z-10 flex items-center justify-between px-6 py-4">
      {/* Left Icon */}
      <div className="flex items-center">
        <img
          src="/Images/Porpop logo-01.png"
          alt="Icon"
          className="w-20 h-10"
        />
      </div>

      {/* Center Links */}
      <ul className="flex space-x-6 items-center text-white">
        <li className="relative group">
          <button className="hover:text-gray-300 focus:outline-none">
            Solutions
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
        <li><a href="/track-order" className="hover:text-gray-300">Track Order</a></li>
        <li><a href="/contact" className="hover:text-gray-300">Contact Us</a></li>
        <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
      </ul>

      {/* Right Buttons */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Login
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
