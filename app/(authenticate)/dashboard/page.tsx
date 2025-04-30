'use client';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedRoute from "@/app/provider/ProtectedRoute";
import VendorDashboard from "./vendor/VendorDashboard";
import { useAuth } from "@/app/context/AuthContext";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";

// Component that uses searchParams wrapped in its own component
const DashboardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment") === "success" || searchParams.get("status") === "success";

  const { user, authToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);

  useEffect(() => {
    if (paymentSuccess) {
      setShowPopup(true);
    }
    setLoading(false);
  }, [paymentSuccess]);

  const handleNotifyAdmin = async () => {
    try {
      setNotifyLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/v1/vendors/notify-admin`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("✅ Admin has been notified!");
        setShowPopup(false);
        router.replace("/dashboard"); // remove query
      } else {
        toast.error("❌ Failed to notify admin.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error contacting admin.");
    } finally {
      setNotifyLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 relative">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md p-6 text-center">
            <p className="text-gray-800 text-lg mb-4">
              Thanks for subscribing. Please click on the button below to proceed with activating your account.
            </p>
            <button
              onClick={handleNotifyAdmin}
              disabled={notifyLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {notifyLoading ? "Sending Request..." : "Request Account Activation"}
            </button>
          </div>
        </div>
      )}

      <VendorDashboard />
    </div>
  );
};

// Main dashboard component with Suspense boundary
const SafeDashboard = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </ProtectedRoute>
  );
};

export default SafeDashboard;