import { useState, useCallback, useMemo } from "react";
import { vendorRegisterSchema, validateField } from "./validation";
import * as z from "zod";
import { VendorData } from "../types/vendor";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { uploadImageToCloudinary } from "../utils/imageUpload";
import Cookies from "js-cookie";


const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;
const authToken = Cookies.get("access_token");

export const useVendorRegistration = () => {

  const { user } = useAuth();


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
  
        // 6. Reset form
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
    [formData, user, authToken, selectedImage]
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
