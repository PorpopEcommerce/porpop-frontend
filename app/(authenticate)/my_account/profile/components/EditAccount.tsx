"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaSave, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { updateUserThunk } from "@/app/redux/features/users/userSlice";
import { toast } from "react-toastify";

interface EditFormProps {
  user: any;
  handleClose: () => void;
}

const EditAccount: React.FC<EditFormProps> = ({ user, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      await dispatch(updateUserThunk(values)).unwrap();
      toast.success("Profile updated successfully!");
      handleClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 border bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
        <button onClick={handleClose} className="text-gray-600 text-xl">
          <FaTimes />
        </button>
      </div>

      <Formik
        initialValues={{
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          username: user.username || "",
          phone_number: user.phone_number || "",
          address: user.address || "",
          country: user.country || "",
          city: user.city || "",
          postal_code: user.postal_code || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-2 gap-4">
            {[
              { name: "first_name", label: "First Name" },
              { name: "last_name", label: "Last Name" },
              { name: "username", label: "Username" },
              { name: "phone_number", label: "Phone Number" },
              { name: "address", label: "Address" },
              { name: "country", label: "Country" },
              { name: "city", label: "City" },
              { name: "postal_code", label: "Postal Code" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-gray-600 font-semibold">
                  {field.label}:
                </label>
                <Field
                  type="text"
                  name={field.name}
                  className="p-2 border rounded-md focus:outline-none"
                />
              </div>
            ))}

            <div className="col-span-2 flex justify-between items-center mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-[#a4cd3a] text-white rounded-md flex items-center gap-2 hover:opacity-50"
                disabled={loading || isSubmitting}
              >
                <FaSave />
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAccount;
