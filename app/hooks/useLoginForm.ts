// useLoginForm.ts

import { useState, useEffect } from "react";
import { z } from "zod";

// Define Zod schema for form validation
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const useLoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{
    username?: string;
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
            username: fieldErrors.username?.[0],
            password: fieldErrors.password?.[0],
        });
        return;
    }

    // Parse stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
    console.log("Parsed storedUsers:", storedUsers); // Debugging line

    // Check if there's a match in the stored users
    const userExists = storedUsers.some(
        (user: { username: string; password: string }) =>
            user.username === formData.username && user.password === formData.password
    );

    if (userExists) {
        setIsAuthenticated(true);
        setTimer(); // Reset authentication status after a delay
        setErrors({}); // Clear errors if login is successful
        setFormData({ username: "", password: "" });
    } else {
        setErrMsg("Invalid username or password");
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
