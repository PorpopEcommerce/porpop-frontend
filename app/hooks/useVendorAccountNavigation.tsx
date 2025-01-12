import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { IconType } from "react-icons"; // Import IconType to type icons
import ManageProduct from "@/app/dashboard/vendor/components/product/ManageProduct"
import DashboardComponent from "../dashboard/vendor/components/product/DashboardComponent";



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
    { label: "Request Quotes", key: "request" },
    { label: "Coupons", key: "coupons" },
    { label: "Reports", key: "reports" },
    { label: "Delivery Time", key: "delivery" },
    { label: "Reviews", key: "reviews" },
    { label: "Withdraw", key: "withdraw" },
    { label: "Reverse Withdraw", key: "r.withdraw" },
    { label: "Badge", key: "badge" },
    { label: "Product Q&A", key: "productQ/A" },
    { label: "Staff", key: "staff" },
    { label: "Followers", key: "followers" },
    { label: "USD Subscription", key: "usd" },
    { label: "Annoucements", key: "annoucements" },
    { label: "Analytics", key: "analytics" },
    { label: "Tools", key: "tools" },
    { label: "Support", key: "support" },
    { label: "My CVs Listing", key: "CVlisting" },
    { label: "Make my CV", key: "myCV" },
    { label: "My Blogs", key: "blog" },
    { label: "Add New Blog", key: "newBlog" },
    { label: "Custom Menu Builder", key: "builder" },
    { label: "Facebook Pixel", key: "pixel" },
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
