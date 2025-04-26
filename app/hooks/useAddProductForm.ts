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
  
  // Add retry mechanism
  const [retryCount, setRetryCount] = useState(0);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [hasUserLoadingError, setHasUserLoadingError] = useState(false);
 
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

  // Helper to extract user ID from potentially nested user object
  const getUserId = useCallback(() => {
    if (!user) return null;
    
    // Check if user might be nested inside a user property (common Redux structure)
    const userObj = user.user ? user.user : user;
    
    // Try to find an ID in various possible locations
    return userObj.id || userObj._id || (userObj.data && userObj.data.id) || null;
  }, [user]);
  
  // Check if user is valid (not just exists, but has required properties)
  const isUserValid = useCallback(() => {
    const userId = getUserId();
    return !!userId && typeof userId === 'string' && userId.length > 0;
  }, [getUserId]);

  // Completely revised user fetch logic with retries and better error handling
  useEffect(() => {
    let isMounted = true;
    const MAX_RETRIES = 3;
    
    const fetchUserData = async () => {
      if (!token) {
        if (isMounted) {
          setIsUserLoading(false);
          setHasUserLoadingError(true);
        }
        return;
      }
      
      // If we already have a valid user, no need to fetch
      if (isUserValid()) {
        if (isMounted) {
          setIsUserLoading(false);
          setHasUserLoadingError(false);
        }
        return;
      }
      
      try {
        if (isMounted) setIsUserLoading(true);
        
        console.log(`Attempting to fetch user data (attempt ${retryCount + 1}/${MAX_RETRIES})`);
        await dispatch(fetchUserThunk()).unwrap();
        
        // Add a short delay to ensure Redux store is updated
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verify the user was actually loaded correctly
        if (!isUserValid()) {
          throw new Error("User data fetched but appears to be invalid or incomplete");
        }
        
        if (isMounted) {
          setIsUserLoading(false);
          setHasUserLoadingError(false);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        
        if (isMounted) {
          if (retryCount < MAX_RETRIES - 1) {
            // Try again with exponential backoff
            setRetryCount(prev => prev + 1);
          } else {
            setIsUserLoading(false);
            setHasUserLoadingError(true);
            toast.error("Could not load user information. Please try refreshing the page.");
          }
        }
      }
    };
    
    fetchUserData();
    
    return () => {
      isMounted = false;
    };
  }, [token, dispatch, retryCount, isUserValid]);
  
  // Log user object for debugging
  useEffect(() => {
    console.log("Fetched user:", user);
    console.log("User loading status:", isUserLoading);
    console.log("User loading error:", hasUserLoadingError);
    console.log("Fetch status:", fetchStatus);
    console.log("Is user valid:", isUserValid());
    console.log("Current retry count:", retryCount);
  }, [user, isUserLoading, hasUserLoadingError, fetchStatus, isUserValid, retryCount]);

  // Fetch product if editing
  useEffect(() => {
    if (!token || !productId) return;
    
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/v1/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (res.data && res.data.body) {
          setFormData(res.data.body);
        } else {
          throw new Error("Invalid product data structure");
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
        toast.error("Failed to load product data");
      }
    };
    
    fetchProduct();
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
    if (!files || files.length === 0) return;
    
    try {
      const imageUrls = await Promise.all(
        files.map(async (file) => {
          const imageUrl = await uploadImageToCloudinary(file);
          return imageUrl;
        })
      );
      
      setFormData((prev) => ({
        ...prev,
        images: imageUrls.filter(url => url && url.trim() !== ""),
      }));
    } catch (error) {
      console.error("Failed to upload images:", error);
      toast.error("Failed to upload one or more images");
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // More comprehensive checks before submission
      if (isUserLoading) {
        toast.info("User information is still loading. Please wait a moment and try again.");
        setIsSubmitting(false);
        return;
      }

      if (hasUserLoadingError || !isUserValid()) {
        toast.error("User information could not be loaded properly. Please try refreshing the page.");
        setIsSubmitting(false);
        return;
      }
      
      if (!token) {
        toast.error("Authentication token is missing. Please log in again.");
        setIsSubmitting(false);
        return;
      }
      
      const cleanedFormData = {
        name: formData.name || "",
        product_type: formData.product_type || "",
        price: formData.price || 0,
        discounted_price: formData.discounted_price || 0,
        description: formData.description || "",
        discount_scheduled_from: formData.discount_scheduled_from
          ? new Date(formData.discount_scheduled_from).toISOString()
          : null,
        discount_scheduled_to: formData.discount_scheduled_to
          ? new Date(formData.discount_scheduled_to).toISOString()
          : null,
        images: formData.images.filter((img) => img && img.trim() !== ""),
        image_url:
          formData.images.length > 0 && formData.images[0] && formData.images[0].trim() !== ""
            ? formData.images[0]
            : "",
        user_id: getUserId(),
        sku: "",
        product_notes: formData.product_notes || "",
        product_status: formData.product_status || "",
        stock: formData.stock || 0,
        is_stock_management_enabled: formData.is_stock_management_enabled || false,
        low_stock_threshold: formData.low_stock_threshold || 0,
        is_wholesales_enabled: formData.is_wholesales_enabled || false,
        stock_type: formData.stock_type || "",
        is_only_one: formData.is_only_one || false,
        wholesales_price: formData.wholesales_price || 0,
        min_quantity_for_wholesales: formData.min_quantity_for_wholesales || 0,
        is_downloadable: formData.is_downloadable || false,
        allow_review: formData.allow_review || false,
        published: true,
        weight: formData.weight || 0,
        length: formData.length || 0,
        width: formData.width || 0,
        height: formData.height || 0,
        shipping_class: formData.shipping_class || "",
        tax_class: formData.tax_class || "",
        tax_status: formData.tax_status || "",
        discount_percentage: formData.discount_percentage || 0,
        min_quantity_for_discount: formData.min_quantity_for_discount || 0,
      };

      try {
        console.log("Submitting with data:", JSON.stringify(cleanedFormData, null, 2));
        console.log("Using token:", token ? "Valid token" : "No token");
        console.log("Using user ID:", user.id);
        
        if (productId) {
          await dispatch(editProductByVendor({ productId, updatedData: cleanedFormData })).unwrap();
          toast.success("Product updated successfully!");
        } else {
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
      } catch (error: any) {
        console.error("Submission error:", error);
        
        // More detailed error handling
        if (error.response) {
          console.error("Response error data:", error.response.data);
          console.error("Response error status:", error.response.status);
          
          const errorMessage = error.response.data?.message || 
                              "An error occurred while submitting the product.";
          toast.error(errorMessage);
        } else if (error.request) {
          toast.error("No response received from server. Please check your connection.");
        } else {
          toast.error(`Error: ${error.message}`);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, user, isUserLoading, hasUserLoadingError, isUserValid, token, dispatch, productId]
  );

  // Extra utility to force a manual user data refresh
  const refreshUserData = useCallback(() => {
    setRetryCount(0);
    setHasUserLoadingError(false);
    setIsUserLoading(true);
  }, []);

  return {
    formData,
    setFormData,
    isSubmitting,
    isSuccess,
    isUserLoading,
    hasUserLoadingError,
    handleChange,
    handleToggle,
    handleImagesChange,
    handleSubmit,
    refreshUserData  // New function to manually refresh user data
  };
};