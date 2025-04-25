"use client";

import { useAuth } from "@/app/context/AuthContext";
import SubHeading from "@/app/components/product/SubHeading";
import Button from "@/app/components/product/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchUserThunk } from "@/app/redux/features/users/userSlice";
import { fetchUserSubscriptions } from "@/app/redux/features/subscription/subscriptionSlice";
import Spinner from "@/app/components/Spinner";

const Dashboard = () => {
  const { logout, user: authUser } = useAuth(); // Also get user from AuthContext
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);

  const { activeUser } = useSelector((state: RootState) => state.user);
  const user = activeUser?.user;
  const vendor = activeUser?.vendor;
  const { subscriptions } = useSelector(
    (state: RootState) => state.subscription
  );

  // Add a console log to check the data
  useEffect(() => {
    console.log("Auth user:", authUser);
    console.log("Redux user:", user);
    console.log("Redux vendor:", vendor);
    console.log("User role:", user?.role);
  }, [authUser, user, vendor]);

  useEffect(() => {
    // Force refresh every time this component mounts
    dispatch(fetchUserThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserSubscriptions(user.id));
    }
  }, [dispatch, user?.id]);

  const hasSubscription = subscriptions?.has_subscription;

  const handleButtonClick = () => {
    setLoading(true);
  
    setTimeout(() => {
      if (user?.role === 'vendor') {
        // Check directly if role is vendor
        router.push("/dashboard/vendor");
      } else if (hasSubscription === true) {
        router.push("/dashboard");
      } else {
        router.push("/subscribe");
      }
      setLoading(false);
    }, 500);
  };

  if (!user?.id) return null;

  const isVendor = user?.role === 'vendor' || !!vendor;

  return (
    <div className="space-y-6">
      <section className="bg-[#1f2937] p-6 rounded-lg shadow-sm text-white">
        <SubHeading title={`Welcome, ${user?.first_name}!`} />
        <p className="mb-3">
          Hello {user?.username} (Not {user?.first_name}?{" "}
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
        {/* Add debug info - remove in production */}
        <div className="mt-3 p-2 bg-gray-800 text-xs">
          <p>Debug Info:</p>
          <p>Role: {user?.role}</p>
          <p>Vendor Status: {isVendor ? 'Yes' : 'No'}</p>
          <p>Has Subscription: {hasSubscription ? 'Yes' : 'No'}</p>
        </div>
      </section>

      <section>
        <div className="w-full max-w-[200px]">
          <Button
            label={loading ? "Loading..." : isVendor ? "Vendor Dashboard" : "Become a Vendor"}
            onClick={handleButtonClick}
            disabled={loading}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;