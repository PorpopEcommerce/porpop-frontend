"use client";

import { HiPlus } from "react-icons/hi";
import Button from "@/components/Button";
import { MdOutlineFileDownload } from "react-icons/md";
import Routes from "@/components/dashboard/Routes";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaSliders } from "react-icons/fa6";

export default function Header() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["All Status", "Active", "Blocked"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="space-y-2">
          <h4 className="text-white text-2xl font-bold">Customers Details</h4>

          <Routes routes={["Customers", "Customer Details"]} />
        </div>
      </div>
    </div>
  );
}
