"use client";

import { useAuth } from "@/app/context/AuthContext";
import SubHeading from "@/app/components/product/SubHeading";
import { useRouter } from "next/navigation";
import { useAccountNavigation } from "../../hooks/useVendorAccountNavigation";

const VendorDashboard = () => {
  const {
    renderContent,
    handleOptionClick,
    vendorDashboardOptions,
    vendorSelectedOption,
  } = useAccountNavigation();

  const { user, vendor } = useAuth();


  if (!user && !vendor) {
    return null;
  }


  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-56 bg-white shadow-md border-r">
        <ul className="flex flex-col">
          {vendorDashboardOptions.map((option) => (
            <li
              key={option.key}
              onClick={() => handleOptionClick(option.key)}
              className={`p-4 cursor-pointer text-sm ${
                vendorSelectedOption === option.key
                  ? "bg-green-500 text-white"
                  : "hover:bg-green-100"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      {/* Toggle between the vendor form and the sidebar content. */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
};

export default VendorDashboard;
