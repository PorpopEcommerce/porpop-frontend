"use client";

import { useAuth } from "@/app/context/AuthContext";
import SubHeading from "@/app/components/product/SubHeading";
import Button from "@/app/components/product/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchUserThunk } from "@/app/redux/features/users/userSlice";
import { fetchUserSubscriptions } from "@/app/redux/features/subscription/subscriptionSlice";
import Spinner from "@/app/components/Spinner";


const Dashboard = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { activeUser } = useSelector((state: RootState) => state.user);
  const user = activeUser?.user;
  const vendor = activeUser?.vendor;
  const { subscriptions } = useSelector(
    (state: RootState) => state.subscription
  );

  

  useEffect(() => {
    if (!user?.id) {
      dispatch(fetchUserThunk());
    }
  }, [dispatch, user?.id]);
  
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserSubscriptions(user.id));
    }
  }, [dispatch, user?.id]);
  

  const hasSubscription = subscriptions?.has_subscription;
  console.log(hasSubscription)

  const handleButtonClick = () => {
    if (hasSubscription === true) {
      router.push("/dashboard");
    } else {
      router.push("/subscribe");
    }
  };

  if (!user?.id) {
    return;
  }

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
      </section>

      {/* Button Area */}
      <section>
        <div className="w-full max-w-[200px]">
          <Button
            label={
              vendor !== null
                ? "Vendor Dashboard"
                : "Become a Vendor"
            }
            onClick={handleButtonClick}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
