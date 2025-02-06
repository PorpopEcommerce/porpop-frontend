"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import Button from "@/app/components/product/Button"; // Reusable Button component
import Heading from "@/app/components/product/Heading"; // Reusable Heading component


const AccountDashboard = () => {
  const { user } = useAuth(); // Fetch active user data
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditProfile = () => setIsEditing((prev) => !prev);

  if (!user) {
    return <div className="text-center text-lg">No user logged in.</div>;
  }


  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <Heading title="Account Details" center />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {/* User Details */}
        <div className="flex flex-col gap-2">
          <span className="font-bold">First Name:</span>
          <span>{user.first_name}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Last Name:</span>
          <span>{user.last_name}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Role:</span>
          <span>{user.role}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Username:</span>
          <span>{user.username}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Address:</span>
          <span>{user.address}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">City:</span>
          <span>{user.city}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Postal Code:</span>
          <span>{user.postalcode}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Country:</span>
          <span>{user.country}</span>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center mt-8">
        <Button label='Manage Account' onClick={toggleEditProfile} />
      </div>

      {/* Edit Profile Form */}
      {/* {isEditing && (
        <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded-md"
            type="text"
            defaultValue={activeUser.firstname}
            placeholder="First Name"
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            defaultValue={activeUser.lastname}
            placeholder="Last Name"
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            defaultValue={activeUser.role}
            placeholder="Role"
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            defaultValue={activeUser.username}
            placeholder="Username"
          />
          <input
            className="border p-2 rounded-md"
            type="email"
            defaultValue={activeUser.email}
            placeholder="Email"
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            defaultValue={activeUser.address}
            placeholder="Address"
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            defaultValue={activeUser.city}
            placeholder="City"
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            defaultValue={activeUser.postalcode}
            placeholder="Postal Code"
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            defaultValue={activeUser.country}
            placeholder="Country"
          />
          <div className="flex justify-center sm:col-span-2">
            <Button label="Save Changes" onClick={(e) => e.preventDefault()} />
          </div>
        </form>
      )} */}
    </div>
  );
};

export default AccountDashboard;
