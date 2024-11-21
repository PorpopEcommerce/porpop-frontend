import { useState, useCallback, useMemo } from "react";
import { registerSchema, validateField } from "./validation"; // Ensure these imports are correct
import * as z from "zod";

type Role = "user";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  address: string;
  city: string;
  postalcode: string;
  country: string;
  phone: string;
}

export const useRegisterForm = () => {
  const [role, setRole] = useState<Role>("user");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };

  const handleInputChange = useCallback(
    (fieldName: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value),
      }));
    },
    []
  );

  const isFormValid = useMemo(() => {
    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
    ];

    return (
      requiredFields.every((field) => formData[field as keyof FormData]) &&
      agreeToTerms
    );
  }, [formData, role, agreeToTerms]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        // Validate the form data
        registerSchema.parse(formData);
        setFormErrors({});
  
        // Retrieve existing users from localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
  
        if (!Array.isArray(users)) {
          console.error("Error: 'users' in localStorage is not an array");
          setSubmitSuccess(false);
          setIsSubmitting(false);
          return;
        }
  
        // Generate a unique ID and timestamps for the new user
        const newUser = {
          ...formData,
          role,
          id: generateUniqueId(),
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        };
  
        // Debugging: Log the new user before adding
        console.log("New User:", newUser);
  
        // Add the new user to the array
        const updatedUsers = [...users, newUser];
  
        // Save updated users array to localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers));
  
        // Indicate success and reset the form
        setSubmitSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          address: "",
          city: "",
          postalcode: "",
          country: "",
          phone: "",
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
    [formData, agreeToTerms, role]
  );
  

  return {
    role,
    setRole,
    formData,
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
