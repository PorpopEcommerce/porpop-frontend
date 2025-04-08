import { useState, useCallback, useEffect } from "react";
import { FormProduct } from "../types/formProduct";
import { uploadImageToCloudinary } from "../utils/imageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export const useAddProductForm = () => {
  const token = Cookies.get("access_token");

  const initialProduct: FormProduct = {
    name: "",
    product_type: "",
    price: 0,
    discounted_price: 0,
    discount_scheduled_from: "",
    discount_scheduled_to: "",
    is_downloadable: false,
    description: "",
    images: [""],
  };

  const [formData, setFormData] = useState<FormProduct>(initialProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [isVendorLoading, setIsVendorLoading] = useState(true); // new

  // 🆕 Fetch vendor ID on mount
  useEffect(() => {
    const fetchVendorId = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${BASE_URL}/v1/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const id = response.data?.body?.vendor?.id;
        if (id) {
          setVendorId(id);
        } else {
          toast.error("Vendor ID not found in vendor profile.");
        }
      } catch (error) {
        console.error("Failed to fetch vendor ID:", error);
        toast.error("Failed to fetch vendor information.");
      } finally {
        setIsVendorLoading(false); // finished loading vendor
      }
    };

    fetchVendorId();
  }, [token]);

  const handleChange = (field: keyof FormProduct, value: any) => {
    setFormData((prev) => {
      if (prev[field] === value) return prev;
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
      setIsSubmitting(true);

      if (!vendorId) {
        toast.error("Vendor ID not available. Cannot submit product.");
        setIsSubmitting(false);
        return;
      }

      const cleanedFormData = {
        name: formData.name,
        product_type: formData.product_type,
        price: formData.price,
        discounted_price: formData.discounted_price,
        description: formData.description || "",
        discount_scheduled_from: formData.discount_scheduled_from
          ? new Date(formData.discount_scheduled_from).toISOString()
          : null,
        discount_scheduled_to: formData.discount_scheduled_to
          ? new Date(formData.discount_scheduled_to).toISOString()
          : null,
        images: formData.images.filter((img) => img.trim() !== ""),
        image_url:
          formData.images.length > 0 && formData.images[0].trim() !== ""
            ? formData.images[0]
            : "",
        vendor_id: vendorId,
        sku: "", // optional
        product_notes: "",
        product_status: "available",
        stock: 0,
        quantity: 0,
        is_wholesales_enabled: false,
        wholesales_price: 0,
        min_quantity_for_wholesales: 0,
        is_downloadable: formData.is_downloadable,
        allow_review: true,
        visibility: true,
        published: true,
      };

      console.log("Cleaned Form Data:", cleanedFormData);

      try {
        const response = await axios.post(
          `${BASE_URL}/v1/products`,
          cleanedFormData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 201) {
          const errorData = response.data.message || "Something went wrong!";
          console.error("Error Response:", errorData);
          toast.error(errorData);
          return;
        }

        const responseData = response.data;
        console.log("Product created successfully:", responseData);

        setFormData(initialProduct);
        setIsSuccess(true);
        toast.success("Product created successfully!");
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("An error occurred while creating the product.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, vendorId]
  );

  return {
    formData,
    setFormData,
    isSubmitting,
    isSuccess,
    isVendorLoading, // 👈 return this too
    vendorId,
    handleChange,
    handleToggle,
    handleMinMaxChange,
    handleImagesChange,
    handleSubmit,
  };
};
