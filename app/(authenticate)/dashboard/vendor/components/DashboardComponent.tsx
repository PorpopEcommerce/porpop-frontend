"use client";

import React from "react";
import { LinearProgress } from "@mui/material";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Earnings from "@/app/components/vendor/Earnings";
import Orders from "@/app/components/vendor/Orders";
import Reviews from "@/app/components/vendor/Reviews";
import Products from "@/app/components/vendor/Products";
import { useAuth } from "@/app/context/AuthContext";
import TrafficProgress from "@/app/components/vendor/TrafficProgress";

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
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-4 flex-1 bg-[#1f2937] rounded-xl">
          <div className="relative flex items-center gap-3 mb-2">
            <div className="flex-grow">
              <LinearProgress
                variant="determinate"
                value={completion}
                sx={{
                  width: "100%",
                  height: 10,
                  borderRadius: 2,
                  backgroundColor: "#374151",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#a4cd3a" },
                }}
              />
            </div>

            <p className="text-[12px] font-medium whitespace-nowrap">
              {completion}% profile completed
            </p>
          </div>
          <div className="w-full text-red-600 flex items-center gap-2">
            <AiOutlineExclamationCircle />
            Add profile picture to gain 15% progress
          </div>
        </div>
        <TrafficProgress />
      </div>
      <div>
        <Earnings />

        <div className="grid grid-cols-2 gap-4">
          <Orders />
          <div>
            <Reviews />
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
