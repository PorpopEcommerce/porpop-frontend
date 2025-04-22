"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For route navigation
import ProtectedRoute from "@/app/provider/ProtectedRoute";
import VendorDashboard from "./vendor/VendorDashboard";
import { useAuth } from "@/app/context/AuthContext";
import { Suspense } from "react";
import Spinner from "@/app/components/Spinner";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

const VendorAccount = () => {
  const router = useRouter();
  const { user, authToken } = useAuth(); // Assuming vendor details come from AuthContext
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return; // Wait until vendor is available

    const checkSubscription = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/v1/billing/subscriptions?user_id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Assuming authToken comes from AuthContext
            },
          }
        );
        const data = await response.data.body;

        const subscription = data.has_subscription;

        // If we're on the dashboard page and user has no subscription, redirect to subscribe
        if (subscription !== true && window.location.pathname.includes('/dashboard')) {
          router.push("/subscribe");
        }
        // If we're on the subscribe page and user has subscription, redirect to dashboard
        else if (subscription === true && window.location.pathname.includes('/subscribe')) {
          router.push("/dashboard");
      }

      } catch (error) {
        console.error("Error fetching subscription details:", error);
        router.push("/");
      } finally {
        setLoading(false); // Ensure loading is turned off
      }
    };

    checkSubscription();
  }, [user, router]);

  if (loading) {
    return (
      <div>
        <Spinner /> {/* Show a loading spinner while fetching subscription */}
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading Page....</div>}>
      <ProtectedRoute>
        <VendorDashboard />
      </ProtectedRoute>
    </Suspense>
  );
};

export default VendorAccount;
