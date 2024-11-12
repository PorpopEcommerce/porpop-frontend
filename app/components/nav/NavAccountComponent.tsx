'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { VscAccount } from 'react-icons/vsc';
import { IoPersonOutline } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { useAuth } from '../../context/AuthContext';

const NavAccountComponent = () => {
  const { logout, activeUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!activeUser) {
    return null;
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Account Icon - Toggles Dropdown on Click */}
      <div
        className="text-2xl text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <VscAccount />
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-10 right-0 w-48 bg-white rounded-lg shadow-md p-4 z-10">
          {/* Account Details */}
          <div className="flex flex-col items-center mb-4">
            <div className="text-7xl text-zinc-500">
              <VscAccount />
            </div>
            <p className="text-xl font-semibold text-black">{activeUser.username}</p>
            <p className="text-sm text-gray-500">{activeUser.email}</p>
          </div>

          {/* Menu Links */}
          <ul>
            <li className="flex">
              <Link
                href="/my_account"
                className="flex items-center gap-2 px-4 py-2 text-xs text-black hover:bg-zinc-300 hover:font-semibold rounded w-full"
                onClick={() => setShowDropdown(false)} // Close dropdown on click
              >
                <IoPersonOutline /> <span>Profile</span>
              </Link>
            </li>
            <li className="flex mt-2">
              <button
                onClick={() => {
                  logout();
                  setShowDropdown(false); // Close dropdown on logout
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs text-black hover:bg-zinc-300 hover:font-semibold rounded w-full"
              >
                <LuLogOut /> Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavAccountComponent;
