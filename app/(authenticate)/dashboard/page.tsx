"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For route navigation
import ProtectedRoute from "@/app/provider/ProtectedRoute";
import VendorDashboard from "./vendor/VendorDashboard";
import { useAuth } from "@/app/context/AuthContext";
import Spinner from "@/app/components/Spinner";
import { triggerLoginModal } from "@/app/events/modalEvents";

const VendorAccount = () => {
  const router = useRouter();
  const { vendor } = useAuth(); // Assuming vendor details come from AuthContext
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vendor) return; // Wait until vendor is available

    const checkSubscription = async () => {
      try {
        const response = await fetch(
          `https://backend-porpop.onrender.com/api/v1/billing/subscriptions?vendorID=${vendor.vendor_id}`
        );
        const data = await response.json();

        const subscription = data[0]?.subscription;

        if (subscription?.IsActive === true) {
          router.push("/dashboard");
        } else {
          router.push("/subscribe");
        }
      } catch (error) {
        console.error("Error fetching subscription details:", error);
        router.push("/");
      } finally {
        setLoading(false); // Ensure loading is turned off
      }
    };

    checkSubscription();
  }, [vendor, router]);

  if (loading) {
    return (
      <div>
        <Spinner /> {/* Show a loading spinner while fetching subscription */}
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <VendorDashboard />
    </ProtectedRoute>
  );
};

export default VendorAccount;
