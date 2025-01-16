import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { IconType } from "react-icons"; // Import IconType to type icons
import ManageProduct from "@/app/dashboard/vendor/components/product/ManageProduct"
import DashboardComponent from "../dashboard/vendor/components/DashboardComponent";
import OrderComponent from "../dashboard/vendor/components/OrderComponent";
import WithDraw from "../dashboard/vendor/components/WithDraw";
import ReverseWithdraw from "../dashboard/vendor/components/ReverseWithdraw";



interface DashboardOption {
  label: string;
  key: string;
  icon?: IconType; // Use IconType for icons
}

export const useAccountNavigation = () => {
  const router = useRouter();
  const [vendorSelectedOption, setVendorSelectedOption] = useState<string>("dashboard");
  const { logout } = useAuth(); // Assuming currentUser contains user details


  // Define vendor dashboard options 
  const vendorDashboardOptions: DashboardOption[] = [
    { label: "Dashboard", key: "dashboard" },
    { label: "POF Programme", key: "pof" },
    { label: "Product", key: "product" },
    { label: "Local Currency Subcription", key: "local" },
    { label: "Orders", key: "orders" },
    { label: "Withdraw", key: "withdraw" },
    { label: "Reverse Withdraw", key: "revWithdraw" },
    { label: "Product Q&A", key: "productQ/A" },
    { label: "Support", key: "support" },
    { label: "Settings", key: "settings" },
  ];

  const handleOptionClick = (key: string) => {
    if (key === "logout") {
      logout();
      router.push("/");
      return;
    }
    setVendorSelectedOption(key);
  };



  const renderContent = (): JSX.Element | null => {
    switch (vendorSelectedOption) {
      case "dashboard":
        return <DashboardComponent />;
      case "pof":
        return <p>POF Layout</p>;
      case "product":
        return <ManageProduct />;
      case "orders":
        return <OrderComponent />;
      case "withdraw":
        return <WithDraw />;
      case "revWithdraw":
        return <ReverseWithdraw />;
      case "":
        return <ManageProduct />;
      default:
        return <p>Parent</p>;
    }
  };

  return {
    vendorDashboardOptions,
    vendorSelectedOption,
    handleOptionClick,
    renderContent,
  };
};
