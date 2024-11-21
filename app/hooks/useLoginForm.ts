// useLoginForm.ts

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/router';
import { z } from "zod";

// Define Zod schema for form validation
const schema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const useLoginForm = () => {

  const { login } = useAuth();
  


  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [errMsg, setErrMsg] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = schema.safeParse(formData);
    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors({
            email: fieldErrors.email?.[0],
            password: fieldErrors.password?.[0],
        });
        return;
    }

    // Parse stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
    console.log("Parsed storedUsers:", storedUsers); // Debugging line

    // Check if there's a match in the stored users
    const userExists = storedUsers.some(
        (user: { email: string; password: string }) =>
            user.email === formData.email && user.password === formData.password
    );

    if (userExists) {
        setIsAuthenticated(true);
        setTimer(); // Reset authentication status after a delay
        login(formData.email,  formData.password);
        setErrors({}); // Clear errors if login is successful
        setFormData({ email: "", password: "" });
    } else {
        setErrMsg("Invalid email or password");
        setIsAuthenticated(false);
    }
};


  const setTimer = () => {
    setTimeout(() => setIsAuthenticated(false), 3000); // Reset after 3 seconds
    setTimeout(() => setErrMsg(""), 3000); // Reset after 3 seconds
  };

  return {
    formData,
    errors,
    errMsg,
    isAuthenticated,
    handleChange,
    handleSubmit,
  };
};
