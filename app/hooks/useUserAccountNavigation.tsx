import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { IconType } from "react-icons"; // Import IconType to type icons
import { FaShoppingCart, FaUser, FaLock, FaComments, FaHeadset, FaSignOutAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import Dashboard from "../my_account/profile/userDashboard/components/Dashboard";
import VendorForm from "@/app/components/user/VendorRegisterationForm";
import CVListing from "../my_account/profile/userDashboard/components/CVListing";
import RequestQuotes from "../my_account/profile/userDashboard/components/RequestQuotes";
import Orders from "../my_account/profile/userDashboard/components/Orders";
import ReturnAndRefund from "../my_account/profile/userDashboard/components/ReturnAndRefund";
import PaymentMethod from "../my_account/profile/userDashboard/components/PaymentMethod";

interface DashboardOption {
  label: string;
  key: string;
  icon?: IconType; // Use IconType for icons
}

export const useAccountNavigation = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("dashboard");
  const [vendorSelectedOption, setVendorSelectedOption] = useState<string>("vendorDashboard");
  const { logout } = useAuth(); // Assuming currentUser contains user details

  // Define user dashboard options with icons
  const dashboardOptions: DashboardOption[] = [
    { label: "Dashboard", key: "dashboard", icon: FaShoppingCart },
    { label: "My CVs", key: "myCV", icon: FaShoppingCart },
    { label: "Request Quotes", key: "request", icon: FaShoppingCart },
    { label: "Create CV", key: "create", icon: FaShoppingCart },
    { label: "Orders", key: "order", icon: FaShoppingCart },
    { label: "Returns and Refunds", key: "ret&ref", icon: FaShoppingCart },
    { label: "Payment methods", key: "paymentMethod", icon: FaUser },
    { label: "My wallet", key: "myWallet", icon: MdPayment },
    { label: "Account details", key: "account", icon: MdPayment },
    { label: "Seller Support Tickets", key: "seller", icon: MdPayment },
    { label: "Wishlist", key: "wishlist", icon: FaLock },
    { label: "Logout", key: "logout", icon: FaSignOutAlt },
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
      case "myCV":
        return <CVListing />;
      case "request":
        return <RequestQuotes />;
      case "order":
        return <Orders />;
      case "ret&ref":
        return <ReturnAndRefund />;
      case "paymentMethod":
        return <PaymentMethod />;
      case "chat":
        return <p>Chat Support</p>;
      case "customer":
        return <p>Customer Service</p>;
      case "product":
        return <p>Product Layout</p>;
      case "vendorForm":
        // Pass the userId prop to VendorForm
        return <VendorForm />;
      default:
        return <p>Dashboard Overview</p>;
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
