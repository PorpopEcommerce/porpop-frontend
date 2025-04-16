import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export const useLoginForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/v1/user/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        toast.success("Login successfully");
      }

      // Call login function from AuthContext
      login(response.data);

      // Extract access_token and user details
      const { access_token, ...userData } = response.data.body;

      // Call login function from AuthContext
      login({ access_token, user: userData });

      // Trigger the onSuccess callback to close the modal
      if (onSuccess) {
        onSuccess();
      }
      setFormData({ email: "", password: "" });

      router.push("/");
    } catch (err: any) {
      setIsLoading(false);
      if (err.response && err.response.status === 403) {

        toast.error("Invalid email or password");
      } else {
        // setErrMsg("An unexpected error occurred. Please try again later.");
        toast.error(err.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
