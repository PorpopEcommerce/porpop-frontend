import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { IconType } from "react-icons"; // Import IconType to type icons
import { FaShoppingCart, FaUser, FaLock, FaComments, FaHeadset, FaSignOutAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import Dashboard from "../my_account/profile/userDashboard/components/Dashboard";
import VendorForm from "@/app/components/user/VendorRegisterationForm";

interface DashboardOption {
  label: string;
  key: string;
  icon?: IconType; // Use IconType for icons
}

export const useAccountNavigation = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("dashboard");
  const [vendorSelectedOption, setVendorSelectedOption] = useState<string>("vendorDashboard");
  const { logout, activeUser } = useAuth(); // Assuming currentUser contains user details

  // Define user dashboard options with icons
  const dashboardOptions: DashboardOption[] = [
    { label: "Dashboard", key: "dashboard", icon: FaShoppingCart },
    { label: "Order", key: "order", icon: FaShoppingCart },
    { label: "Account Details", key: "account", icon: FaUser },
    { label: "Payment", key: "payment", icon: MdPayment },
    { label: "Login and Security", key: "security", icon: FaLock },
    { label: "Chat", key: "chat", icon: FaComments },
    { label: "Customer Service", key: "customer", icon: FaHeadset },
    { label: "Logout", key: "logout", icon: FaSignOutAlt },
  ];

  // Define user dashboard options with icons
  const vendorDashboardOptions: DashboardOption[] = [
    { label: "Dashboard", key: "vendorDashboard", icon: FaShoppingCart },
    { label: "Product", key: "product", icon: FaShoppingCart },
  ];

  const handleOptionClick = (key: string) => {
    if (key === "logout") {
      logout();
      router.push("/");
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
        return <Dashboard
          handleVendorFormClick={handleVendorFormClick}
          
        />;
      case "order":
        return <p>Order History</p>;
      case "account":
        return <p>Account Details</p>;
      case "payment":
        return <p>Payment Options</p>;
      case "security":
        return <p>Login and Security Settings</p>;
      case "chat":
        return <p>Chat Support</p>;
      case "customer":
        return <p>Customer Service</p>;
      case "product":
        return <p>Product Layout</p>;
      case "vendorForm":
        // Pass the userId prop to VendorForm
        return <VendorForm userId={activeUser?.id || ""} />;
      default:
        return <p>Dashboard Overview</p>;
    }
  };

  return {
    dashboardOptions,
    vendorDashboardOptions,
    selectedOption,
    vendorSelectedOption,
    handleOptionClick,
    handleVendorFormClick,  
    renderContent,
  };
};
