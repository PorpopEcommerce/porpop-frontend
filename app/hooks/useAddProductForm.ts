import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

interface FormData {
  title: string;
  productType: string;
  price: string;
  discountedPrice: string;
  scheduleDate: boolean;
  scheduledFrom: string;
  scheduledTo: string;
  categories: { id: number; value: string }[];
  tags: string[];
  shortDescription: string;
  productDescription: string;
  SKU: string;
  stockType: string;
  allowType: boolean;
  isStockManagementEnabled: boolean;
  stockQuantity: number;
  lowStockThreshold: number;
}

export const useAddProductForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    productType: "Simple",
    price: "",
    discountedPrice: "",
    scheduleDate: false,
    scheduledFrom: "",
    scheduledTo: "",
    categories: [],
    tags: [],
    shortDescription: "",
    productDescription: "",
    SKU: "",
    stockType: "In Stock",
    allowType: false,
    isStockManagementEnabled: false,
    stockQuantity: 0,
    lowStockThreshold: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { activeUser } = useAuth();

  // Generalized change handler
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggle = (field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleTagsChange = (tags: string[]) => handleChange("tags", tags);

  const handleUpdateCategories = useCallback((updatedCategories: any) => {
    setFormData((prev) => ({ ...prev, categories: updatedCategories }));
  }, []);

  const generateUniqueId = () => {
    return `${Date.now()}`;
  };

  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isSubmitting) return; // Prevent duplicate submissions
      setIsSubmitting(true);

      try {
        if (
          !activeUser ||
          !activeUser.id ||
          !activeUser.role.includes("vendor")
        ) {
          throw new Error("No authenticated vendor user found");
        }

        // Create a new product object with a unique ID
        const newProduct = {
          id: generateUniqueId(),
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
          ...formData,
        };

        // Update the vendor's product array
        const updatedVendorData = {
          ...activeUser.vendorData,
          products: [...(activeUser.vendorData?.products || []), newProduct],
        };

        // Update user data with the new product
        const updatedUser = { ...activeUser, vendorData: updatedVendorData };

        // Send the updated user data to the API
        const updateResponse = await fetch(
          `http://localhost:3001/users/${activeUser.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
          }
        );

        if (!updateResponse.ok) throw new Error("Failed to update vendor data");

        console.log("Product successfully added", newProduct);
        alert("Product added successfully");

        // Reset form
        setFormData({
          title: "",
          productType: "Simple",
          price: "",
          discountedPrice: "",
          scheduleDate: false,
          scheduledFrom: "",
          scheduledTo: "",
          categories: [],
          tags: [],
          shortDescription: "",
          productDescription: "",
          SKU: "",
          stockType: "In Stock",
          allowType: false,
          isStockManagementEnabled: false,
          stockQuantity: 0,
          lowStockThreshold: 0,
        });
      } catch (error: any) {
        console.error("Error submitting form:", error.message);
        alert(error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [activeUser, formData, isSubmitting]
  );

  return {
    formData,
    isSubmitting,
    handleChange,
    handleToggle,
    handleTagsChange,
    handleUpdateCategories,
    handleSubmit,
  };
};
