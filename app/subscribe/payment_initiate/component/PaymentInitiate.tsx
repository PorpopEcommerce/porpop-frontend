"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/product/Button";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

const PaymentInitiate: React.FC = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const amount = searchParams.get("amount");
  const planName = searchParams.get("planName");
  const { user } = useAuth();
  const router = useRouter();
  const currency = searchParams.get("currency");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async () => {
    const token = Cookies.get("access_token");

    setLoading(true);
    setError(null);

    try {
      // Step 1: Check if user already has an active subscription
      const response = await axios.get(
        `${BASE_URL}/v1/billing/subscriptions?user_id=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const subscription = response.data?.body;

      if (subscription?.has_subscription === true) {
        toast.warning("You are currently on a subscription. Please visit the dashboard for more information.");
        return router.push("/dashboard");
      }

      // Step 2: Initiate Payment Subscription
      const res = await fetch(`${BASE_URL}/v1/billing/subscribe`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          User_id: user.id,
          Provider: "paystack",
          Plan_id: planId,
          redirect_url: `${window.location.origin}/dashboard?payment=success`,
        }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to initiate payment");
      }
      
      const data = await res.json();

      const paymentUrl = data.body.link;

      if (!paymentUrl) {
        throw new Error("Payment URL not received from the backend");
      }

      // Redirect user to the Paystack payment page
      router.push(paymentUrl);

    } catch (err: any) {
      toast.error(err?.message || "An error occurred while initiating payment");
      setError(err?.message || "An error occurred while initiating payment");
    } finally {
      setLoading(false);
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

  return (
    <div className="flex justify-center items-center h-screen bg-[#111827] px-8 py-12">
      <div className="bg-[#1f2937] shadow-lg rounded-lg w-full max-w-md p-8 text-white">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-lg lg:text-2xl font-semibold">Payment Initialization</h1>
        </div>

        {/* Plan Info */}
        <div className="mt-6 space-y-4 text-sm md:text-xl">
          <div className="flex justify-between">
            <span>Plan Name:</span>
            <span className="font-semibold">{planName}</span>
          </div>
          <div className="flex justify-between">
            <span>Email:</span>
            <span className="font-semibold">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-semibold">{`${currency} ${amount}`}</span>
          </div>
        </div>

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
