"use client";

import { HiPlus } from "react-icons/hi";
import Button from "../../../Button";
import { MdOutlineFileDownload } from "react-icons/md";
import Routes from "../../Routes";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaSliders } from "react-icons/fa6";

export default function Header() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["All Status", "Active", "Blocked"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="space-y-2">
          <h4 className="text-white text-2xl font-bold">Customers</h4>

          <Routes routes={["Customers"]} />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="secondary" icon={<MdOutlineFileDownload />}>
            Export
          </Button>
          <Button variant="green" icon={<HiPlus />}>
            Add Customer
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <div className="flex flex-wrap gap-4 border border-dark-400 rounded-lg overflow-hidden text-sm">
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-dark-600 border border-dark-400 px-2 py-2 rounded-lg">
              <FiSearch className="text-dark-200 text-xl" />
              <input
                type="text"
                placeholder="Search customer..."
                className="bg-transparent outline-none text-sm placeholder-dark-200 text-white w-32 sm:w-64"
              />
            </div>
            <Button variant="dark" icon={<FaSliders />}>
              Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
