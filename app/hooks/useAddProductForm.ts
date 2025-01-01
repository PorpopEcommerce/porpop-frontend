import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Product } from "../types/product";

export const useAddProductForm = () => {
  const initialProduct: Product = {
    id: "",
    title: "",
    productType: "Simple",
    price: 0,
    discountedPrice: 0,
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
    shippingMethod: "Standard",
    shippingCost: 0,
    isFreeShippingEnabled: false,
    latitude: "",
    longitude: "",
    linkedProducts: [],
    deliveryOptions: [],
    deliveryTime: "",
    discountPercentage: 0,
    discountStartDate: "",
    discountEndDate: "",
    images: "",
    createdAt: "",
    updatedAt: "",
    backorderDeliveryTime: "",
    outOfStockDeliveryTime: "",
    isDiscountEnabled: false,
    minQuantityForDiscount: 0,
    minQuantityForWholesale: 0,
    wholesalePrice: 0,
    isWholesaleEnabled: false,
    productStatusType: "Online",
    visibilityType: "Visible",
    reviewType: false,
    productNote: "",
    dimensions: {weight: 0, height: 0, length: 0, width: 0},
    shippingClass: '',
    taxStatus: '',
    taxClass: '',
    isShippingManagementEnabled: false,
  };

  const [formData, setFormData] = useState<Product>(initialProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { activeUser } = useAuth();

  // Generalized change handler
  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggle = (field: keyof Product) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImagesChange = (images: string) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const handleTagsChange = (tags: string[]) => handleChange("tags", tags);

  const handleUpdateCategories = useCallback((updatedCategories: any) => {
    setFormData((prev) => ({ ...prev, categories: updatedCategories }));
  }, []);

  const generateUniqueId = () => `${Date.now()}`;
  const getCurrentTimestamp = () => new Date().toISOString();

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
  
        const currentTimestamp = getCurrentTimestamp();
  
        // Check if it's an edit or add operation
        let updatedProducts = [...(activeUser.vendorData?.products || [])];
        let updatedProduct;
  
        if (formData.id) {
          // Editing an existing product
          updatedProducts = updatedProducts.map((product) =>
            product.id === formData.id
              ? { ...formData, updatedAt: currentTimestamp } // Update product
              : product
          );
          updatedProduct = formData;
          console.log("Product successfully edited", updatedProduct);
        } else {
          // Adding a new product
          updatedProduct = {
            ...formData,
            id: generateUniqueId(),
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          };
          updatedProducts.push(updatedProduct);
          console.log("Product successfully added", updatedProduct);
        }
  
        // Update the vendor's product array
        const updatedVendorData = {
          ...activeUser.vendorData,
          products: updatedProducts,
        };
  
        // Update user data with the updated product array
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
  
        alert(
          formData.id
            ? "Product edited successfully"
            : "Product added successfully"
        );
  
        // Reset form to initial state if adding a new product
        if (!formData.id) setFormData(initialProduct);
      } catch (error: any) {
        console.error("Error submitting form:", error.message);
        alert(error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [activeUser, formData, isSubmitting, initialProduct]
  );
  

  return {
    formData,
    setFormData,
    isSubmitting,
    handleChange,
    handleToggle,
    handleTagsChange,
    handleUpdateCategories,
    handleImagesChange,
    handleSubmit,
  };
};
