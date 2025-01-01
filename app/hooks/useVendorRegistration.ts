import { useState, useCallback, useMemo } from "react";
import { vendorRegisterSchema, validateField } from "./validation";
import * as z from "zod";
import { useDispatch } from "react-redux";
import {
  setRegistrationStatus,
  setError,
} from "@/app/redux/features/users/userSlice";
import { VendorData } from "../types/vendor";
import { useAuth } from "../context/AuthContext";

export const useVendorRegistration = () => {
  const dispatch = useDispatch();
  const { user, vendor } = useAuth();

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      dispatch(setRegistrationStatus("loading"));

      try {
        // Validate form data
        vendorRegisterSchema.parse(formData);
        setFormErrors({});

        // Payload structure for the API
        const vendorData = {
          user_id: user.user_id,
          vendor_info: { ...formData },
        };

        // API call
        const response = await fetch(
          `https://backend-porpop.onrender.com/api/v1/user/become-vendor`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vendorData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response from backend:", errorData);
          throw new Error(errorData.message || "Failed to register vendor");
        }

        

        // Update session storage with new user and vendor data
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("vendor", JSON.stringify(vendor));

        const result = await response.json();
        console.log("Vendor successfully registered:", result);

        setSubmitSuccess(true);
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
        } else {
          console.error("Unexpected error:", error);
          dispatch(
            setError(
              error.message || "An error occurred during vendor registration"
            )
          );
        }
        setSubmitSuccess(false);
        dispatch(setRegistrationStatus("failed"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, user, dispatch]
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
    agreeToTerms,
  };
};
