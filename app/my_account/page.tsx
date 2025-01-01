'use client';

import { useEffect, useState } from "react";
import ProtectedRoute from "../provider/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import AccountPage from "./profile/page";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";

const AccountPageWithProtection = () => {
  const { user } = useAuth(); // Check authentication state
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) {
      // Wait for authentication to resolve
      return;
    }

    if (!user) {
      // Redirect to login page if not logged in
      router.push("/login_signin");
    } else {
      setLoading(false); // Stop loading once authenticated
    }
  }, [user, router]);

  if (loading) {
    // Optionally render a loading spinner or placeholder
    return <div><Spinner /></div>;
  }

  return (
    <ProtectedRoute>
      <AccountPage />
    </ProtectedRoute>
  );
};

export default AccountPageWithProtection;
