"use client";

import React from "react";
import { LinearProgress } from "@mui/material";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Earnings from "@/app/components/vendor/Earnings";
import Orders from "@/app/components/vendor/Orders";
import Reviews from "@/app/components/vendor/Reviews";
import Products from "@/app/components/vendor/Products";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchUserThunk } from "@/app/redux/features/users/userSlice";
import Button from "@/app/components/product/Button";
import { calculateCompletion } from "@/app/utils/vendor";

interface DashboardComponentProps {
  handleVendorForm: () => void;
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({
  handleVendorForm,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { activeUser } = useSelector((state: RootState) => state.user);
  const vendorDetails = activeUser?.vendor;

  useEffect(() => {
    if (!vendorDetails) {
      dispatch(fetchUserThunk()); // Fetch user details if not available
    }
  }, [dispatch, vendorDetails]);
  // Ensure currentUser and vendorData exist
  if (!vendorDetails) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
        <p className="text-red-500">
          No vendor profile found for the current user. Please Register here!
        </p>
        <Button
          label="Register Here"
          custom="max-w-fit mt-3"
          onClick={handleVendorForm}
        />
      </div>
    );
  }

  const completion = calculateCompletion(vendorDetails);

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
          {completion < 100 && (
            <div className="w-full text-red-600 flex items-center gap-2">
              <AiOutlineExclamationCircle />
              Add profile picture to gain 15% progress
            </div>
          )}
        </div>
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
