"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/product/Button";
import Spinner from "@/app/components/Spinner";

const PaymentInitiate: React.FC = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const amount = searchParams.get("amount");
  const planName = searchParams.get("planName");
  const { user, vendor } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  console.log(planName);

  const initiatePayment = async () => {
    if (!user || !planId || !amount) {
      setError("Missing required information for payment.");
      return;
    }

    setLoading(true);
    setError(null);

    const response = await fetch(
      `https://backend-porpop.onrender.com/api/v1/billing/subscriptions?vendorID=${vendor.vendor_id}`
    );
    const data = await response.json();

    // Since the API response is an array, access the first item
    const subscription = data[0]?.subscription;

    if (subscription?.IsActive === true) {
      alert(
        "You are currently on a subscription, please visit dashboard for more information."
      );
      return router.push("/dashboard");
    } else {
      try {
        const response = await fetch(
          "https://backend-porpop.onrender.com/api/v1/payment/initiate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.user_id,
              vendor_id: vendor?.vendor_id,
              amount: parseInt(amount, 10), // Convert to a number
              gateway: "paystack",
              plan_id: planId,
              email: user.email,
              name: user.first_name,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to initiate payment");
        }

        const data: { payment: any } = await response.json();

        if (data.payment.payment_url) {
          // Redirect to the payment gateway
          router.push(data.payment.payment_url);
        } else {
          throw new Error("Payment URL not received from the backend");
        }
      } catch (err) {
        setError(
          (err as Error).message || "An error occurred while initiating payment"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg">
        Loading payment initiation...
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 py-12">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Payment Initialization
          </h1>
        </div>

        {/* Plan Info */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Plan Name:</span>
            <span className="font-semibold">{planName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-semibold">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-semibold">{`₦${amount}`}</span>{" "}
            {/* Adjust currency based on the amount */}
          </div>
        </div>

        {/* Paystack Logo */}
        {/* <div className="mt-6 flex justify-center">
          <img src={paystackLogo} alt="Paystack" className="w-32 h-auto" />
        </div> */}

        {/* Action Button */}
        <div className="mt-8">
          <Button
            label="Continue Payment"
            custom="w-full bg-green-500 text-white hover:bg-green-600"
            onClick={initiatePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentInitiate;
