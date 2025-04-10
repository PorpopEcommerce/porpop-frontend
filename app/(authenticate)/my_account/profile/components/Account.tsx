"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import EditAccount from "./EditAccount";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import {
  fetchUserThunk,
  deleteUserThunk,
} from "@/app/redux/features/users/userSlice";
import { toast } from "react-toastify";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaFlag,
  FaCity,
  FaCode,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

const UserAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.activeUser?.user);
  const vendorDetails = useSelector((state: RootState) => state.user.activeUser?.vendor);
  const fetchStatus = useSelector((state: RootState) => state.user.fetchStatus);
  const [isEditing, setIsEditing] = useState(false);

  const { logout } = useAuth();
  console.log(user)
  console.log(vendorDetails)

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserThunk()); // Fetch user details if not available
    }
  }, [dispatch, user]);

  const handleEditAccount = () => setIsEditing(true);
  const handleCloseForm = () => setIsEditing(false);

  // Set deleteTrigger when the user confirms deletion
  const confirmDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await dispatch(deleteUserThunk()).unwrap();
        toast.success("Profile deleted successfully!");
        logout();
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Failed to delete profile.");
      }
    }
  };

  if (fetchStatus === "loading") {
    return <div className="text-center text-lg">Loading user data...</div>;
  }

  if (!user) {
    return <div className="text-center text-lg">No user logged in.</div>;
  }

  // User info array (for mapping)
  const userDetails = [
    { label: "First Name", value: user.first_name, icon: <FaUser /> },
    { label: "Last Name", value: user.last_name, icon: <FaUser /> },
    { label: "Username", value: user.username, icon: <FaUser /> },
    { label: "Phone Number", value: user.phone_number, icon: <FaPhone /> },
    { label: "Address", value: user.address, icon: <FaMapMarkerAlt /> },
    { label: "Country", value: user.country, icon: <FaFlag /> },
    { label: "City", value: user.city, icon: <FaCity /> },
    { label: "Postal Code", value: user.postal_code, icon: <FaCode /> },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {isEditing ? (
        <EditAccount handleClose={handleCloseForm} user={user} />
      ) : (
        <div className="relative border rounded-lg shadow-lg bg-white">
          {/* Header Section */}
          <div className="flex justify-between items-center rounded-t-lg border-b p-4 bg-gray-100">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-3">
                <FaUser className="text-gray-600 text-2xl" />
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </h3>
            </div>
            <div className="flex gap-2 items-center">
              <button
                className="text-red-500 text-xl"
                onClick={confirmDeleteAccount}
              >
                <MdDelete />
              </button>
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
              {userDetails.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div className="text-gray-600 text-2xl">{item.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 font-semibold text-lg">
                      {item.label}:
                    </span>
                    <p className="text-gray-900 text-lg font-medium">
                      {item.value || "N/A"}
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

export default UserAccount;
