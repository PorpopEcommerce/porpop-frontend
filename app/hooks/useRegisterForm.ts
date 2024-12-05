import { useState, useCallback, useMemo } from "react";
import { registerSchema, validateField } from "./validation"; 
import * as z from "zod";
import { useDispatch } from "react-redux";
import { addUser, setRegistrationStatus, setError } from "@/app/redux/features/users/userSlice";
import { User } from "../types/user";

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
  const dispatch = useDispatch();
  
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
    return Date.now().toString();
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
      dispatch(setRegistrationStatus("loading"));

      try {
        // Validate the form data
        registerSchema.parse(formData);
        setFormErrors({});

        // Create a new user object
        const newUser: User = {
          ...formData,
          role: [role],
          id: generateUniqueId(),
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
          isAuthenticated: false
        };

        // Debugging: Log the new user before sending the request
        console.log("New User:", newUser);

        // Send the new user data to the API endpoint
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          throw new Error("Failed to submit user data");
        }

        // Dispatch to Redux store
        dispatch(addUser(newUser));

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

        console.log("User successfully added to the database.");
        dispatch(setRegistrationStatus("succeeded"));
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.errors.forEach((err) => {
            errors[err.path[0]] = err.message;
          });
          setFormErrors(errors);
        } else {
          console.error("Unexpected error:", error);
          dispatch(setError("An error occurred during registration"));
        }
        setSubmitSuccess(false);
        dispatch(setRegistrationStatus("failed"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, agreeToTerms, role, dispatch]
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