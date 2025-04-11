import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { IconType } from "react-icons"; // Import IconType to type icons
import Dashboard from "@/app/(authenticate)/my_account/profile/components/Dashboard";
import VendorForm from "@/app/components/user/VendorRegisterationForm";
import Orders from "../(authenticate)/my_account/profile/components/Orders";
import ReturnAndRefund from "@/app/(authenticate)/my_account/profile/components/ReturnAndRefund";
import UserAccount from "../(authenticate)/my_account/profile/components/Account";

interface DashboardOption {
  label: string;
  key: string;
  icon?: IconType; // Use IconType for icons
}

export const useAccountNavigation = () => {
  const [selectedOption, setSelectedOption] = useState<string>("dashboard");
  const [vendorSelectedOption, setVendorSelectedOption] =
    useState<string>("vendorDashboard");
  const { logout } = useAuth(); // Assuming currentUser contains user details

  // Define user dashboard options with icons
  const dashboardOptions: DashboardOption[] = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Orders", key: "order" },
    { label: "Returns and Refunds", key: "ret&ref" },
    { label: "Account details", key: "account" },
    { label: "Logout", key: "logout" },
  ];

  const handleOptionClick = (key: string) => {
    if (key === "logout") {
      logout();
      return;
    }
    setSelectedOption(key);
    setVendorSelectedOption(key);
  };

  // Function to handle vendor form navigation
  const handleVendorFormClick = () => {
    setSelectedOption("vendorForm");
  };

  const renderContent = (): JSX.Element | null => {
    switch (selectedOption) {
      case "dashboard":
        return <Dashboard />;
      case "order":
        return <Orders />;
      case "ret&ref":
        return <ReturnAndRefund />;
      case "account":
        return <UserAccount />;
      case "vendorForm":
        // Pass the userId prop to VendorForm
        return <VendorForm />;
      default:
        return <Dashboard />;
    }
  };

  return {
    dashboardOptions,
    selectedOption,
    vendorSelectedOption,
    handleOptionClick,
    handleVendorFormClick,
    renderContent,
  };
};
