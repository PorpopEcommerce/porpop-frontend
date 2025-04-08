import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

interface EditVendorFormProps {
    vendor: any;
    authToken: string; // Ensure authToken is a string
    handleClose: () => void;
  }

const EditVendorAccount:React.FC<EditVendorFormProps> = ({ vendor, authToken, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);

    if (!authToken) {
      toast.error("You are not authenticated. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/v1/vendors/${vendor.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Vendor account updated successfully!");
      } else {
        toast.error(data.message || "Failed to update vendor account.");
      }
    } catch (error) {
      console.error("Error updating vendor account:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 border bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Edit Vendor Account</h2>
        <button onClick={handleClose} className="text-gray-600 text-xl">
          <FaTimes />
        </button>
      </div>

      <Formik
        initialValues={{
          shop_name: vendor.shop_name || "",
          shop_url: vendor.shop_url || "",
          shop_description: vendor.shop_description || "",
          street: vendor.street || "",
          city: vendor.city || "",
          country: vendor.country || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-2 gap-4">
            {["shop_name", "shop_url", "shop_description", "street", "city", "country"].map((field) => (
              <div key={field} className="flex flex-col col-span-2">
                <label className="text-gray-600 font-semibold capitalize">{field.replace("_", " ")}</label>
                <Field type="text" name={field} className="p-2 border rounded-md focus:outline-none" />
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

export default EditVendorAccount;
