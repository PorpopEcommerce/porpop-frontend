import { useState, useCallback, useEffect } from "react";
import { FormProduct } from "../types/formProduct";
import { uploadImageToCloudinary } from "../utils/imageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchUserThunk } from "@/app/redux/features/users/userSlice";
import { editProductByVendor } from "@/app/redux/features/products/productSlice";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export const useAddProductForm = (productId?: string | null) => {
  const token = Cookies.get("access_token");
  const dispatch = useDispatch<AppDispatch>();
  const { activeUser: user, fetchStatus } = useSelector((state: RootState) => state.user);
  
  // Added loading state to track user data loading
  const [isUserLoading, setIsUserLoading] = useState(true);
 
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
    stock: 0,
    is_stock_management_enabled: false,
    low_stock_threshold: 0,
    stock_type: "",
    is_only_one: false,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    shipping_class: "",
    tax_class: "",
    tax_status: "",
    is_wholesales_enabled: false,
    wholesales_price: 0,
    min_quantity_for_wholesales: 0,
    discount_percentage: 0,
    min_quantity_for_discount: 0,
    product_status: "",
    allow_review: false,
    visibility: "",
    product_notes: "",
  };

  const [formData, setFormData] = useState<FormProduct>(initialProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Improved fetch user effect with better handling
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setIsUserLoading(false);
        return;
      }
      
      if (!user) {
        try {
          setIsUserLoading(true);
          await dispatch(fetchUserThunk()).unwrap();
        } catch (error) {
          console.error("Failed to fetch user:", error);
          toast.error("Could not load user information. Please refresh the page.");
        } finally {
          setIsUserLoading(false);
        }
      } else {
        setIsUserLoading(false);
      }
    };
    
    fetchUserData();
  }, [token, dispatch, user]);

  // Debug user object
  useEffect(() => {
    console.log("Fetched user:", user);
    console.log("User loading status:", isUserLoading);
    console.log("Fetch status:", fetchStatus);
  }, [user, isUserLoading, fetchStatus]);

  // Fetch product if editing
  useEffect(() => {
    if (!token) return;
    if (productId) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/v1/product/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFormData(res.data.body);
        } catch (error) {
          console.error("Failed to fetch product", error);
          toast.error("Failed to load product data");
        }
      };
      fetchProduct();
    }
  }, [productId, token]);

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Check if user data is still loading
      if (isUserLoading) {
        toast.info("User information is still loading. Please wait a moment and try again.");
        setIsSubmitting(false);
        return;
      }

      // Check if we have a valid user ID after loading is complete
      if (!user?.id) {
        toast.error("User information could not be loaded. Please try refreshing the page.");
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
        user_id: user.id,
        sku: "",
        product_notes: formData.product_notes,
        product_status: formData.product_status,
        stock: formData.stock,
        is_stock_management_enabled: formData.is_stock_management_enabled,
        low_stock_threshold: formData.low_stock_threshold,
        is_wholesales_enabled: formData.is_wholesales_enabled,
        stock_type: formData.stock_type,
        is_only_one: formData.is_only_one,
        wholesales_price: formData.wholesales_price,
        min_quantity_for_wholesales: formData.min_quantity_for_wholesales,
        is_downloadable: formData.is_downloadable,
        allow_review: formData.allow_review,
        published: true,
        weight: formData.weight,
        length: formData.length,
        width: formData.width,
        height: formData.height,
        shipping_class: formData.shipping_class,
        tax_class: formData.tax_class,
        tax_status: formData.tax_status,
        discount_percentage: formData.discount_percentage,
        min_quantity_for_discount: formData.min_quantity_for_discount,
      };

      try {
        if (productId) {
          await dispatch(editProductByVendor({ productId, updatedData: cleanedFormData })).unwrap();
          toast.success("Product updated successfully!");
        } else {
          console.log("Submitting product with token:", token ? "Valid token" : "No token");
          console.log("Submitting with user ID:", user.id);
          
          const response = await axios.post(`${BASE_URL}/v1/products`, cleanedFormData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.status !== 201) {
            const errorData = response.data.message || "Something went wrong!";
            toast.error(errorData);
            return;
          }
          setFormData(initialProduct);
          setIsSuccess(true);
          toast.success("Product created successfully!");
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("An error occurred while creating the product.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, user, isUserLoading, token, dispatch, productId]
  );

  return {
    formData,
    setFormData,
    isSubmitting,
    isSuccess,
    isUserLoading,
    handleChange,
    handleToggle,
    handleImagesChange,
    handleSubmit,
  };
};