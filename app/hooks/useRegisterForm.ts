// useRegisterForm.ts
import { useState, useCallback, useMemo } from "react";
import { registerSchema, validateField } from "./validation"; // Ensure these imports are correct
import * as z from "zod";

type FormType = "user" | "vendor";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  shopName?: string;
  shopDescription?: string;
  city?: string;
  zipCode?: string;
}

export const useRegisterForm = () => {
  const [formType, setFormType] = useState<FormType>("user");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const handleInputChange = useCallback(
    (fieldName: keyof FormData, value: string) => {
      // Use keyof FormData here
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value), // Ensure fieldName is correctly typed
      }));
    },
    []
  );

  const handleFormTypeChange = useCallback(
    (type: FormType) => setFormType(type),
    []
  );

  const isFormValid = useMemo(() => {
    const requiredFields =
      formType === "vendor"
        ? [
            "firstName",
            "lastName",
            "username",
            "email",
            "password",
            "shopName",
            "shopDescription",
          ] // Ensure these are the exact keys
        : ["firstName", "lastName", "username", "email", "password"];

    return (
      requiredFields.every((field) => formData[field as keyof FormData]) &&
      agreeToTerms
    );
  }, [formData, formType, agreeToTerms]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        // Check entire form validity using Zod schema
        registerSchema.parse(formData);
        setFormErrors({});
  
        // Retrieve existing users from localStorage, or use an empty array if it doesn't exist
        const users = JSON.parse(localStorage.getItem("users") || "[]");
  
        // Check if users is an array before proceeding
        if (!Array.isArray(users)) {
          console.error("Error: 'users' in localStorage is not an array");
          setSubmitSuccess(false);
          setIsSubmitting(false);
          return;
        }
  
        // Add new user data to the array
        users.push({ ...formData, formType });
  
        // Save updated array back to localStorage
        localStorage.setItem("users", JSON.stringify(users));
  
        console.log({ ...formData, formType });
  
        // Indicate success
        setSubmitSuccess(true);
        // Reset form data
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          shopName: "",
          shopDescription: "",
          city: "",
          zipCode: "",
        });
        setAgreeToTerms(false);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.errors.forEach((err) => {
            errors[err.path[0]] = err.message;
          });
          setFormErrors(errors);
        } else {
          console.error("Unexpected error:", error);
        }
        setSubmitSuccess(false);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );
  
  return {
    formType,
    setFormType,
    formData,
    formErrors,
    agreeToTerms,
    isFormValid,
    isSubmitting,
    submitSuccess,
    setAgreeToTerms,
    handleInputChange,
    handleFormTypeChange,
    handleSubmit,
  };
};
