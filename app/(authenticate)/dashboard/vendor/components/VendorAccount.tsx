"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import EditVendorAccount from "./EditVendorAccount";
import { FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import Button from "@/app/components/product/Button";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchUserThunk } from "@/app/redux/features/users/userSlice";
import { useEffect } from "react";


interface VendorAccountProps {
  handleVendorForm: () => void;
}

const VendorAccount: React.FC<VendorAccountProps> = ({ handleVendorForm }) => {
  const { authToken } = useAuth(); // Fetch active user data
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  
    const { activeUser } = useSelector((state: RootState) => state.user);
    const vendor = activeUser?.vendor;

     useEffect(() => {
        if (!vendor) {
          dispatch(fetchUserThunk()); // Fetch user details if not available
        }
      }, [dispatch, vendor]);


  // Check if vendor exists before rendering details
  if (!vendor) {
    return (
      <div className="flex flex-col text-lg">
        <div className="bg-red-500 w-full p-5 text-white flex items-center gap-2">
          <AiOutlineExclamationCircle />
          <p>No Profile to display, Please complete profile here</p>
        </div>
        
        <Button
          label="Complete Profile"
          custom="max-w-fit mt-5"
          onClick={handleVendorForm}
        />
      </div>
    );
  }

  const handleEditAccount = () => setIsEditing(true);
  const handleCloseForm = () => setIsEditing(false);

  // Ensure vendor properties are safely accessed
  const vendorDetails = [
    { label: "Shop Name", value: vendor?.shop_name || "N/A" },
    { label: "Shop URL", value: vendor?.shop_url || "N/A" },
    { label: "Shop Description", value: vendor?.shop_description || "N/A" },
    { label: "Street", value: vendor?.street || "N/A" },
    { label: "City", value: vendor?.city || "N/A" },
    { label: "Country", value: vendor?.country || "N/A" },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {isEditing ? (
        <EditVendorAccount
          handleClose={handleCloseForm}
          vendor={vendor}
          authToken={authToken}
        />
      ) : (
        <div className="relative border rounded-lg shadow-lg bg-white">
          {/* Header Section */}
          <div className="flex justify-between items-center rounded-t-lg border-b p-4 bg-gray-100">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-3">
                <FaUser className="text-gray-600 text-2xl" />
                <span>{vendor?.shop_name || "N/A"}</span>
              </h3>
            </div>
            <div>
              <button onClick={handleEditAccount}>
                <FiEdit2 />
              </button>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Contact Info
            </h3>
            <ul className="grid grid-cols-2 gap-4">
              {vendorDetails.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="text-gray-600 font-semibold text-lg">
                      {item.label}:
                    </span>
                    <p className="text-gray-900 text-lg font-medium">
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorAccount;
