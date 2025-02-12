import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

interface SubscriptionData {
  TrafficLimit: number;
  TrafficCount: number;
  IsLimit: boolean;
  IsActive: boolean;
}

const TrafficProgress = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const { vendor } = useAuth();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(
          `https://backend-porpop.onrender.com/api/v1/billing/subscriptions?vendorID=${vendor.vendor_id}`
        );
        setSubscription(response.data[0].subscription);
        console.log(response.data[0].subscription);
      } catch (error) {
        console.error("Error fetching subscription data", error);
      }
    };

    fetchSubscription();
  }, [vendor.vendor_id]);
  
  console.log(subscription)

  if (!subscription) return <p>Loading...</p>;

  const { TrafficLimit, TrafficCount } = subscription;
  const progressPercentage = (TrafficCount / TrafficLimit) * 100;
  const isLimitReached = TrafficCount >= TrafficLimit;

  return (
    <div className="w-full max-w-md p-4 bg-[#1f2937] shadow-md rounded-lg">
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            progressPercentage < 50
              ? "bg-green-500"
              : progressPercentage < 80
              ? "bg-yellow-500"
              : "bg-red-500"
          } transition-all`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-white">
        {TrafficCount} of {TrafficLimit} users have purchased from your store.
      </p>

      {isLimitReached && (
        <p className="text-red-600 font-semibold mt-2">
          Traffic limit reached! Upgrade your plan to allow more users.
        </p>
      )}
    </div>
  );
};

export default TrafficProgress;
