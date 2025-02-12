"use client";

import { useAuth } from "@/app/context/AuthContext";
import SubHeading from "@/app/components/product/SubHeading";
import Button from "@/app/components/product/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Dashboard = () => {
  const { user, logout, vendor } = useAuth();
  const router = useRouter();

  console.log(user)


  // useEffect(() => {
  //   const fetchSubscription = async () => {
  //     try {
  //       if (vendor?.vendor_id) {
  //         const response = await fetch(
  //           `https://backend-porpop.onrender.com/api/v1/billing/subscriptions?vendorID=${vendor.vendor_id}`
  //         );
  //         const data = await response.json();
  //         console.log(data);
          
  //         const subscription = data[0]?.subscription;
  //         setSubscriptionStatus(subscription?.IsActive || false);
  //       }
  //     } catch (err: any) {
  //       console.error("Error fetching subscription:", err.message);
  //       setSubscriptionStatus(false);
  //     }
  //   };

  //   if (user) fetchSubscription();
  //   else router.push("/login_signin");
  // }, [user, vendor?.vendor_id, router]);


  if (!user) {
    return null; // Avoid rendering until the user is checked
  }

  const isVendor = user.role === "vendor";

  return (
    <div className="space-y-6">
      <section className="bg-[#1f2937] p-6 rounded-lg shadow-sm text-white">
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
              label={"Vendor Dashboard"} // Change label during loading
              onClick={() => router.push('/dashboard')}
            />
          ) : (
            <Button
              label="Become a Vendor"
              onClick={() => router.push('/subscribe')}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
