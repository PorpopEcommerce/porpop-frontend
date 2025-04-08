import { useState, useCallback, useMemo } from "react";
import { registerSchema, validateField } from "./validation";
import { UserData } from "../types/user";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-toastify";


const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

console.log(BASE_URL);

export const useRegisterForm = () => {
  // const [role, setRole] = useState<Role>("customer");
  const [formData, setFormData] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [verificationToken, setVerificationToken] = useState(false);

  const handleInputChange = useCallback(
    (fieldName: keyof UserData, value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value),
      }));
    },
    []
  );

  const isFormValid = useMemo(() => {
    const requiredFields = ["first_name", "last_name", "email", "password"];

    return (
      requiredFields.every((field) => formData[field as keyof UserData]) &&
      agreeToTerms
    );
  }, [formData, agreeToTerms]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        // Validate form data using Zod schema
        registerSchema.parse(formData);
        setFormErrors({});
        console.log("form is submitting", formData);
  
        // Send the new user data to the API endpoint
        const response = await axios.post(`${BASE_URL}/v1/user/register`, {
          user: { ...formData }, 
        });
  
        // Handle successful response
        console.log("User successfully registered:", response.data);
  
        setSubmitSuccess(true);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
        setAgreeToTerms(false);
        setVerificationToken(true); // Debugging: Set verification token to true for now
        toast.success("Registration successful!");
      } catch (error: any) {
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.errors.forEach((err) => {
            errors[err.path[0]] = err.message;
          });
          setFormErrors(errors);
        } 
        // Handle Axios request errors
        else if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
          toast.error(error.response?.data?.message || "Registration failed");
        } 
        // Handle unexpected errors
        else {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred");
        }
        setSubmitSuccess(false);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, agreeToTerms]
  );
  

  return {
    formData,
    verificationToken,
    formErrors,
    agreeToTerms,
    isFormValid,
    isSubmitting,
    submitSuccess,
    setAgreeToTerms,
    handleInputChange,
    handleSubmit,
  };
};
