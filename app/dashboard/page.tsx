"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For route navigation
import ProtectedRoute from "../provider/ProtectedRoute";
import VendorDashboard from "./vendor/VendorDashboard";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const VendorAccount = () => {
  const router = useRouter();
  const { vendor } = useAuth(); // Assuming vendor details come from AuthContext
  const [loading, setLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        if (!vendor || !vendor.vendor_id) {
          return;
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
        }
      } catch (error) {
        console.error("Error fetching subscription details:", error);
        router.push("/subscribe"); // Handle errors by redirecting
      } finally {
        setLoading(false); // Stop loading
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
