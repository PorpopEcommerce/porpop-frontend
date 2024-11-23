import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { IconType } from "react-icons"; // Import IconType to type icons


interface DashboardOption {
  label: string;
  key: string;
  icon?: IconType; // Use IconType for icons
}

export const useAccountNavigation = () => {
  const router = useRouter();
  const [vendorSelectedOption, setVendorSelectedOption] = useState<string>("dashboard");
  const { logout, activeUser } = useAuth(); // Assuming currentUser contains user details


  // Define vendor dashboard options 
  const vendorDashboardOptions: DashboardOption[] = [
    { label: "Dashboard", key: "dashboard" },
    { label: "POF Programme", key: "pof" },
    { label: "Product", key: "product" },
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
        return <p>Dashboard Overview</p>;
      case "pof":
        return <p>POF Layout</p>;
      case "product":
        return <p>Product Layout</p>;
      default:
        return <p>Dashboard Overview</p>;
    }
  };

  return {
    vendorDashboardOptions,
    vendorSelectedOption,
    handleOptionClick,
    renderContent,
  };
};
