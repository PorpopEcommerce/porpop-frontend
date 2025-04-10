"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "@/app/components/Spinner";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;
const SuccessPage = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const gateway = searchParams.get("gateway");

  useEffect(() => {
    const verifyAndCreateShipping = async (
      reference: string,
      gateway: string
    ) => {
      const token = Cookies.get("access_token");

      if (!token) return;

      if (token) {
        if (!reference || !gateway) {
          return;
        }
        try {
          // Verify payment
          const verifyRes = await axios.get(`${BASE_URL}/v1/payments/verify`, {
            params: { reference, gateway },
            headers: { Authorization: `Bearer ${token}` },
          });

          const payment = verifyRes.data?.payment;

          if (payment?.status === "success") {
            const orderId = payment?.id;

            // Create shipping
            const shippingRes = await axios.post(
              `${BASE_URL}/v1/shipping/${orderId}`,
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            toast.success("Shipping created successfully.");
            return { success: true, orderId };
          } else {
            toast.error("Payment failed or not verified.");
            return { success: false };
          }
        } catch (error) {
          console.error("Error verifying payment or creating shipping:", error);
          setStatus("error");
          toast.error("Something went wrong post-payment.");
          return { success: false };
        }
      }
    };

    verifyAndCreateShipping(reference!, gateway!);
  }, [reference, gateway]);

  return (
    <div className="text-center mt-10">
      {status === "loading" && (
        <div className="flex flex-col items-center">
          <p className="font-bold">Processing Payment</p>
          <Spinner />
        </div>
      )}
      {status === "success" && (
        <div className="text-center font-bold">
          <p >Order confirmed! Shipping is underway.</p>
        </div>
        )}
      {status === "error" && (
        <p className="text-center font-bold">Something went wrong. Please contact support.</p>
      )}
    </div>
  );
};

export default SuccessPage;
