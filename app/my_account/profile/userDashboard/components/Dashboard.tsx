"use client";

import { useAuth } from "@/app/context/AuthContext";
import SubHeading from "@/app/components/product/SubHeading";
import Button from "@/app/components/product/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DashboardProps {
  handleVendorFormClick: () => void; // Accept the vendor handler as a prop
}

const Dashboard: React.FC<DashboardProps> = ({ handleVendorFormClick }) => {
  const { user, logout, vendor } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login_signin"); // Redirect to login if user is not logged in
    }
  }, [user, router]);

  const handleVendorButtonClick = async () => {
    try {
      const response = await fetch(
        `https://backend-porpop.onrender.com/api/v1/billing/subscriptions?vendorID=${vendor.vendor_id}`
      );
      const data = await response.json();
  
      // Since the API response is an array, access the first item
      const subscription = data[0]?.subscription;
  
      if (subscription?.IsActive === true) {
        router.push("/dashboard");
      } else {
        router.push("/subscribe");
      }
    } catch (err: any) {
      console.error("Error fetching subscription:", err.message);
    }
  };
  

  if (!user) {
    return null; // Avoid rendering until the user is checked
  }

  const isVendor = user.role === "vendor";

  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <SubHeading title={`Welcome, ${user.username}!`} />
        <p className="mb-3">
          Hello {user.username} (Not {user.username}?{" "}
          <span className="underline cursor-pointer" onClick={() => logout()}>
            Log out
          </span>
          )
        </p>
        <p>
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses, and edit your password and
          account details.
        </p>
      </section>

      {/* Other Details */}
      <section>
        <div className="w-full max-w-[200px]">
          {isVendor ? (
            <Button
              label="Vendor Dashboard"
              onClick={handleVendorButtonClick}
            />
          ) : (
            <Button label="Become a Vendor" onClick={handleVendorFormClick} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
