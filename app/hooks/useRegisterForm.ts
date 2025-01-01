import { useState, useCallback, useMemo } from "react";
import { registerSchema, validateField } from "./validation"; 
import * as z from "zod";
import { useDispatch } from "react-redux";
import { addUser, setRegistrationStatus, setError } from "@/app/redux/features/users/userSlice";

type Role = "buyer";

interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export const useRegisterForm = () => {
  const dispatch = useDispatch();
  
  const [role, setRole] = useState<Role>("buyer");
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);


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
      "first_name",
      "last_name",
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
        const newUser = { user: { ...formData, role } };
  
        // Debugging: Log the new user before sending the request
        console.log("New User:", newUser);
  
        // Send the new user data to the API endpoint using fetch
        const response = await fetch(
          "https://backend-porpop.onrender.com/api/v1/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(newUser), // Ensure proper payload structure
          }
        );
  
        // Check if the response is successful
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response from backend:", errorData);
          throw new Error(errorData.message || "Failed to submit user data");
        }
  
        const result = await response.json();
        console.log("User successfully registered:", result);
  
        // Dispatch to Redux store
        dispatch(addUser(newUser.user));
  
        // Indicate success and reset the form
        setSubmitSuccess(true);
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
        });
        setAgreeToTerms(false);
        dispatch(setRegistrationStatus("succeeded"));
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.errors.forEach((err) => {
            errors[err.path[0]] = err.message;
          });
          setFormErrors(errors);
        } else {
          console.error("Unexpected error:", error);
          dispatch(setError(error.message || "An error occurred during registration"));
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