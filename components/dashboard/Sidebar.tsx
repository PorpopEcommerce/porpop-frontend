"use client";

import { useState } from "react";
import { FaCalendar, FaChevronDown } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { BiSolidDashboard } from "react-icons/bi";
import { TbFileCheck } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import { FaCartShopping, FaFolderClosed } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { BsChatSquareTextFill } from "react-icons/bs";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [ecommerceOpen, setEcommerceOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-dark-600 text-white py-4 transform flex flex-col h-screen ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out md:w-1/2 w-full lg:w-[16.67%] z-[500]`}
    >
      <div className="lg:hidden mb-4 fixed top-6 right-8">
        <button onClick={toggleSidebar} className="text-white">
          <FiX size={24} />
        </button>
      </div>
      <div className="space-y-6 ">
        <div className="px-8">
          <Link onClick={toggleSidebar} className="text-5xl font-bold" href="/">
            <Image src="/Images/logo.png" alt="logo" width={120} height={30} />
          </Link>
        </div>
        <ul className=" space-y-2 h-[calc(100vh-76px)] overflow-y-auto sidebarScrollbar">
          <li>
            <Link
              onClick={toggleSidebar}
              href="/"
              className="flex items-center gap-3 text-dark-200 hover:text-white px-8 py-3 hover:bg-dark-400"
            >
              <BiSolidDashboard fontSize={24} className="text-dark-200" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => setEcommerceOpen(!ecommerceOpen)}
              className="flex justify-between items-center w-full text-dark-200 hover:text-white px-8 py-3 hover:bg-dark-400"
            >
              <div className="flex items-center gap-2 text-dark-200 hover:text-white">
                <FaCartShopping fontSize={24} className="text-dark-200" />
                <span>ECommerce</span>
              </div>
              <div
                className={`${ecommerceOpen && "rotate-180"} transitionItem`}
              >
                <FaChevronDown />
              </div>
            </button>
            {ecommerceOpen && (
              <ul className="space-y-1">
                <Link
                  onClick={toggleSidebar}
                  href="/dashboard/ecommerce/product"
                >
                  <li className="hover:bg-dark-400 cursor-pointer text-dark-200 hover:text-white pl-16 pr-8 py-3">
                    Product
                  </li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href="/dashboard/ecommerce/categories"
                >
                  <li className="hover:bg-dark-400 cursor-pointer text-dark-200 hover:text-white pl-16 pr-8 py-3">
                    Categories
                  </li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href="/dashboard/ecommerce/orders"
                >
                  <li className="hover:bg-dark-400 cursor-pointer text-dark-200 hover:text-white pl-16 pr-8 py-3">
                    Orders
                  </li>
                </Link>
                <Link
                  onClick={toggleSidebar}
                  href="/dashboard/ecommerce/customers"
                >
                  <li className="hover:bg-dark-400 cursor-pointer text-dark-200 hover:text-white pl-16 pr-8 py-3">
                    Customer
                  </li>
                </Link>
              </ul>
            )}
          </li>
          <li>
            <Link
              onClick={toggleSidebar}
              href="/"
              className="flex items-center gap-3 text-dark-200 hover:text-white px-8 py-3 hover:bg-dark-400"
            >
              <TbFileCheck fontSize={24} className="text-dark-200" />
              <span>Project</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => setContactOpen(!contactOpen)}
              className="flex justify-between items-center w-full text-dark-200 hover:text-white px-8 py-3 hover:bg-dark-400"
            >
              <div className="flex items-center gap-2 text-dark-200 hover:text-white">
                <MdContacts fontSize={24} className="text-dark-200" />
                <span>Contact</span>
              </div>
              <div className={`${contactOpen && "rotate-180"} transitionItem`}>
                <FaChevronDown />
              </div>
            </button>
            {contactOpen && (
              <ul className="space-y-1">
                <li className="hover:bg-dark-400 text-dark-200 hover:text-white pl-16 pr-8 py-3">
                  Random Link 1
                </li>
                <li className="hover:bg-dark-400 text-dark-200 hover:text-white pl-16 pr-8 py-3">
                  Random Link 2
                </li>
                <li className="hover:bg-dark-400 text-dark-200 hover:text-white pl-16 pr-8 py-3">
                  Random Link 3
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              onClick={toggleSidebar}
              href="/"
              className="flex items-center gap-3 text-dark-200 hover:text-white px-8 py-3 hover:bg-dark-400"
            >
              <FaFolderClosed fontSize={24} className="text-dark-200" />
              <span>File Manager</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={toggleSidebar}
              href="/"
              className="flex items-center gap-3 text-dark-200 hover:text-white px-8 py-3 hover:bg-dark-400"
            >
              <BsChatSquareTextFill fontSize={24} className="text-dark-200" />
              <span>Chat</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={toggleSidebar}
              href="/"
              className="flex items-center gap-3 text-dark-200 hover:text-white px-8 py-3 hover:bg-dark-400"
            >
              <FaCalendar fontSize={24} className="text-dark-200" />
              <span>Calendar</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
