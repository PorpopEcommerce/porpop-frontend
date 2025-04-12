"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/app/provider/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import UserDashboard from "./profile/userDashboard/UserDashboard";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Suspense } from "react";

const AccountPageWithProtection = () => {
  const { user } = useAuth(); // Fetch auth state
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (!token) {
      toast.error("Please login to continue");
      router.push("/");
      return;
    }

    if (user) {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    </Suspense>
  );
};

export default AccountPageWithProtection;
