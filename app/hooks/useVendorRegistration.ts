import { useState, useCallback, useMemo, useEffect } from "react";
import { vendorRegisterSchema, validateField } from "./validation";
import * as z from "zod";
import { VendorData } from "../types/vendor";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { uploadImageToCloudinary } from "../utils/imageUpload";
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { fetchUserThunk } from "@/app/redux/features/users/userSlice";
import { AppDispatch } from "@/app/redux/store";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;
const authToken = Cookies.get("access_token");

export const useVendorRegistration = () => {
  const { user, refreshUserData } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [formData, setFormData] = useState<VendorData>({
    shop_name: "",
    shop_url: "",
    city: "",
    street: "",
    country: "",
    shop_description: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // This useEffect checks for two things:
  // 1. If the user has a subscription but is not approved, redirect to dashboard with waiting message
  // 2. If the user doesn't have a subscription, redirect to subscription page
  useEffect(() => {
    const checkStatusAndRedirect = async () => {
      if (!authToken) return;
      
      try {
        // Check if user has a subscription
        const subscriptionResponse = await axios.get(`${BASE_URL}/v1/billing/check-subscription`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        const hasSubscription = 
          subscriptionResponse.data && 
          subscriptionResponse.data.body && 
          subscriptionResponse.data.body.hasSubscription;
        
        if (hasSubscription) {
          // User has a subscription - now check if they're an approved vendor
          try {
            const vendorResponse = await axios.get(`${BASE_URL}/v1/vendors/me`, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            });
            
            // If this request succeeds, they are an approved vendor - let them access the form
            if (vendorResponse.status === 200) {
              // Allow access to the form - do nothing
              return;
            }
          } catch (error) {
            // If request fails, they have a subscription but aren't an approved vendor
            // Redirect to dashboard where they'll see the waiting message
            toast.info("You already have a subscription. Waiting for admin approval.");
            router.push('/dashboard');
          }
        } else {
          // No subscription found - redirect to subscription page
          toast.error("You need an active subscription to become a vendor.");
          router.push('/subscribe');
        }
      } catch (error) {
        console.error("Error checking status:", error);
        // Default to subscription page if there's an error
        router.push('/subscribe');
      }
    };
    
    checkStatusAndRedirect();
  }, [router]);

  const handleInputChange = useCallback(
    (fieldName: keyof VendorData, value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value, "vendor"),
      }));
    },
    []
  );

  const isFormValid = useMemo(() => {
    const requiredFields = [
      "shop_name",
      "shop_url",
      "city",
      "street",
      "country",
      "shop_description",
    ];

    return (
      requiredFields.every((field) => formData[field as keyof VendorData]) &&
      agreeToTerms
    );
  }, [formData, agreeToTerms]);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        // 1. Validate data with Zod
        vendorRegisterSchema.parse(formData);
        setFormErrors({});
  
        // 2. Ensure user + token exists
        if (!user || !user.id || !authToken) {
          toast.error("You must be logged in to register as a vendor.");
          setIsSubmitting(false);
          return;
        }
  
        // 3. Optional image upload
        let uploadedImageUrl = "";
        if (selectedImage) {
          uploadedImageUrl = await uploadImageToCloudinary(selectedImage);
          if (!uploadedImageUrl) {
            toast.error("Image upload failed. Try again.");
            setIsSubmitting(false);
            return;
          }
        }
  
        // 4. Construct payload without nesting
        const payload = {
          user_id: user.id,
          ...formData,
          shop_logo: uploadedImageUrl || "", // blank if no image
        };
  
        console.log("Payload to send:", payload);
  
        // 5. Submit to backend
        const response = await axios.post(`${BASE_URL}/v1/vendors`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        console.log("Vendor successfully registered:", response.data);
        toast.success("Vendor successfully registered!");
        
        // 6. Refresh user data in AuthContext
        await refreshUserData();
        
        // 7. IMPORTANT: Also refresh user data in Redux
        dispatch(fetchUserThunk());
        
        toast.info("User data refreshed. You can now access your vendor dashboard.");
        
        // 8. Redirect to vendor dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard/vendor");
        }, 1500); // Give time for the toast to be seen
  
        // 9. Reset form
        setSubmitSuccess(true);
        setSelectedImage(null);
        setFormData({
          shop_name: "",
          shop_url: "",
          city: "",
          street: "",
          country: "",
          shop_description: "",
        });
        setAgreeToTerms(false);
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.errors.forEach((err) => {
            errors[err.path[0]] = err.message;
          });
          setFormErrors(errors);
          toast.error("Please correct the highlighted fields.");
        } else if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
  
          if (message === "subscription not found") {
            toast.error("You need an active subscription to become a vendor.");
            // Redirect to subscription page
            setTimeout(() => {
              router.push("/subscribe");
            }, 1500);
          } else {
            toast.error(message || "Something went wrong. Try again.");
          }
  
          console.error("Axios error:", error.response?.data);
        } else {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred.");
        }
  
        setSubmitSuccess(false);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, user, authToken, selectedImage, refreshUserData, dispatch, router]
  );
  
  return {
    formData,
    formErrors,
    isSubmitting,
    isFormValid,
    submitSuccess,
    handleInputChange,
    handleSubmit,
    setAgreeToTerms,
    previewUrl,
    handleImageChange,
    agreeToTerms,
  };
};