"use client";

import React from "react";
import { LinearProgress } from "@mui/material";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Earnings from "@/app/components/vendor/Earnings";
import Orders from "@/app/components/vendor/Orders";
import Reviews from "@/app/components/vendor/Reviews";
import Products from "@/app/components/vendor/Products";
import { useAuth } from "@/app/context/AuthContext";

const calculateCompletion = (vendor: any): number => {
  if (!vendor) return 0; // Handle undefined vendorData

  const requiredFields = [
    "shop_name",
    "shop_url",
    "city",
    "street",
    "shop_description",
    "country",
    "shop_logo",
  ];

  // Count filled required fields
  const filledFields = requiredFields.filter((field) => vendor[field]);

  // Calculate completion percentage
  return Math.min(
    Math.round((filledFields.length / requiredFields.length) * 100),
    100
  );
};

const DashboardComponent = () => {
  const { vendor } = useAuth();
  // Ensure currentUser and vendorData exist
  if (!vendor) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
        <p className="text-red-500">
          No vendor profile found for the current user.
        </p>
      </div>
    );
  }

  const completion = calculateCompletion(vendor);

  return (
    <div className="">
      <div className="p-4 border mb-4">
        <div className="relative mb-4">
          <LinearProgress
            variant="determinate"
            value={completion}
            sx={{ width: "100%", height: 19, borderRadius: 2 }}
          />
          <p className="absolute inset-0 text-[12px] text-white text-center font-medium">
            {completion}% Profile Completed
          </p>
        </div>
        <div className="bg-red-500 w-full p-5 text-white flex items-center gap-2">
          <AiOutlineExclamationCircle />
          Add profile picture to gain 15% progress
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <Earnings />
          <Orders />
          <Reviews />
          <Products />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default DashboardComponent;
