"use client";

import { FaCalendar, FaCaretRight } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX, HiPlus } from "react-icons/hi";
import Button from "../../../Button";
import { MdOutlineFileDownload } from "react-icons/md";
import { useState } from "react";
import { FaSliders } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import Routes from "../../Routes";
import Link from "next/link";

export default function Header() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["All Products", "Published", "Low Stock", "Draft"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="space-y-2">
          <h4 className="text-white text-2xl font-bold">Product</h4>

          <Routes routes={["Product List"]} />
        </div>

        <div className="md:flex flex-wrap items-center gap-4 hidden">
          <Link href="/dashboard/ecommerce/product/add">
            <Button variant="green" icon={<HiPlus />}>
              Add New Product
            </Button>
          </Link>
          <Button variant="secondary" icon={<MdOutlineFileDownload />}>
            Import Product from Aliexpress
          </Button>
          <Button variant="secondary">Import Aliexpress Settings</Button>
          <Button variant="green">Import</Button>
          <Button variant="green">Export</Button>
        </div>

        <div className="flex md:hidden flex-wrap items-center gap-2">
          <Link href="/dashboard/ecommerce/product/add">
            <Button variant="green" icon={<HiPlus />} />
          </Link>
          <Button variant="secondary" icon={<MdOutlineFileDownload />}>
            Aliexpress
          </Button>
          <Button variant="secondary">Aliexpress Settings</Button>
          <Button variant="green">Import</Button>
          <Button variant="green">Export</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <div className="flex border border-dark-400 rounded-lg overflow-hidden text-sm">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-center transition-colors ${
                  activeTab === index
                    ? "bg-primary-50 text-primary-700"
                    : "bg-transparent text-grey-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-end gap-4">
            <div className="flex items-center flex-wrap grow gap-3 bg-dark-600 border border-dark-400 px-2 py-2 rounded-lg self-stretch md:self-baseline">
              <FiSearch className="text-dark-200 text-xl" />
              <input
                type="text"
                placeholder="Search product..."
                className="bg-transparent outline-none text-sm placeholder-dark-200 text-white w-32 sm:w-64"
              />
            </div>
            <Button variant="dark" icon={<FaCalendar />}>
              Select Date
            </Button>
            <Button variant="dark" icon={<FaSliders />}>
              Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
