import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FormProduct } from "../types/formProduct";

export const useAddProductForm = () => {
  const initialProduct: FormProduct = {
    name: "",
    type: "Simple",
    price_info: {
      regular_price: 0,
      discounted_price: 0,
      allow_discount_schedule_date: false,
      discount_scheduled_from: "",
      discount_scheduled_to: "",
    },
  };

  const [formData, setFormData] = useState<FormProduct>(initialProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { vendor, user } = useAuth();

  // Generalized change handler
  const handleChange = (field: keyof FormProduct, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggle = (field: keyof FormProduct) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImagesChange = (images: string) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  // const handleTagsChange = (tags: string[]) => handleChange("tags", tags);

  const handleUpdateCategories = useCallback((updatedCategories: any) => {
    setFormData((prev) => ({ ...prev, categories: updatedCategories }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true); // Optional: Set loading state

      try {
        // Log the data for debugging
        console.log("Form Data before submission:", formData);

        const requestBody = {
          ...formData,
          vendor_id: vendor.vendor_id, // Ensure vendor_id is included in the payload
        };

        // Send the request to the API
        const response = await fetch(
          "https://backend-porpop.onrender.com/api/v1/product/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        // Check if the response is successful
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error Response:", errorData);
          alert("Error creating product: " + errorData.message); // Display error message
          return;
        }

        // Parse the response
        const responseData = await response.json();
        console.log("Product created successfully:", responseData);

        // Reset the form or provide feedback
        setFormData(initialProduct);
        alert("Product created successfully!");
      } catch (error) {
        console.error("Submission error:", error);
        alert("An error occurred while creating the product.");
      } finally {
        setIsSubmitting(false); // Reset loading state
      }
    },
    [formData, initialProduct, user?.token]
  );

  return {
    formData,
    setFormData,
    isSubmitting,
    handleChange,
    handleToggle,
    // handleTagsChange,
    handleUpdateCategories,
    handleImagesChange,
    handleSubmit,
  };
};
