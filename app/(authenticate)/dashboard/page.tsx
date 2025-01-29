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
  const { vendor, user } = useAuth(); // Assuming vendor details come from AuthContext
  const [loading, setLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {

        if (!user) {
          alert('please log in to continue');
          router.push('/')
          triggerLoginModal()
        } else if (!vendor || !vendor.vendor_id) {
          alert('please create a vendor account to continue');
          router.push("/my_account");
        }

        const response = await fetch(
          `https://backend-porpop.onrender.com/api/v1/billing/subscriptions?vendorID=${vendor.vendor_id}`
        );
        const data = await response.json();

        // Since the API response is an array, access the first item
        const subscription = data[0]?.subscription;

        if (subscription?.IsActive === true) {
          setHasSubscription(true); // Subscription is active
          router.push("/dashboard");
          setLoading(false)
        } else {
          router.push("/subscribe");
        }
      } catch (error) {
        console.error("Error fetching subscription details:", error);
        router.push("/"); // Handle errors by redirecting
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
