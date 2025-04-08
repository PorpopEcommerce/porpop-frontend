import { useState, useCallback } from "react";
import { FormProduct } from "../types/formProduct";
import { uploadImageToCloudinary } from "../utils/imageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL
export const useAddProductForm = () => {

  const token = Cookies.get("access_token")

  const initialProduct: FormProduct = {
    name: "",
    product_type: "",
    price: Number(0),
    discounted_price: Number(0),
    discount_scheduled_from: "",
    discount_scheduled_to: "",
    // category: "",
    // weight: 0,
    // length: 0,
    // width: 0,
    // height: 0,
    // shipping_class: "",
    // tax_class: "",
    // tax_status: "",
    // is_wholesales_enabled: true,
    // wholesales_price: 0,
    // min_quantity_for_wholesales: 0,
    is_downloadable: false,
    description: "",
    // discount_percentage: 0,
    // min_quantity_for_discount: 0,
    // allow_review: false,
    // min_order: 0,
    // max_order: 0,
    // product_status: "",
    // visibility: "",
    // product_notes: "",
    // add_to_cart: false,
    // hide_price: false,
    // stock: 0,
    // is_stock_management_enabled: false,
    // low_stock_threshold: 0,
    // stock_type: "",
    // is_only_one: false,
    images: [""],
  };

  const [formData, setFormData] = useState<FormProduct>(initialProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  // Generalized change handler
  const handleChange = (field: keyof FormProduct, value: any) => {
    setFormData((prev) => {
      if (prev[field] === value) return prev; // Avoid redundant updates
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleToggle = (field: keyof FormProduct) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImagesChange = async (files: File[]) => {
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const imageUrl = await uploadImageToCloudinary(file);
        return imageUrl;
      })
    );
    setFormData((prev) => ({
      ...prev,
      images: imageUrls,
    }));
  };


  const handleMinMaxChange = (
    field: "minQuantity" | "maxQuantity",
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);  // Optional: Set loading state

      console.log("Form Data before submission:", formData);
      console.log(token)
      try {
        // Log the data for debugging

        // Send the request to the API
        const response = await axios.post(
          `${BASE_URL}/v1/products`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

          }
        );

        // Check if the response is successful
        if (response.status !== 201) {
          const errorData = await response.data.message;
          console.error("Error Response:", errorData);
          toast.error(errorData)
          return;
        }

        // Parse the response
        const responseData = await response.data;
        console.log("Product created successfully:", responseData);

        // Reset the form or provide feedback
        setFormData(initialProduct);
        setIsSuccess(true);
        toast.success("Product created successfully!");
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("An error occurred while creating the product.");
      } finally {
        setIsSubmitting(false); // Reset loading state
      }
    },
    [formData]
  );

  return {
    formData,
    setFormData,
    isSubmitting,
    isSuccess,
    handleChange,
    handleToggle,
    handleMinMaxChange,
    handleImagesChange,
    handleSubmit,
  };
};
