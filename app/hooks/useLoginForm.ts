import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export const useLoginForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [errMsg, setErrMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState("");
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
    setErrMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://backend-porpop.onrender.com/api/v1/user/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      // Call login function from AuthContext
      login(response.data);

      setFormData({ email: "", password: "" });
      setIsSuccessfull("Logged in successfully");

       // Trigger the onSuccess callback to close the modal
       if (onSuccess) {
        onSuccess();
      }


      router.push("/");
    } catch (err: any) {
      setIsLoading(false);
      if (err.response && err.response.status === 403) {
        setErrMsg("Invalid email or password");
      } else {
        setErrMsg("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    errMsg,
    isLoading,
    isSuccessfull,
    handleChange,
    handleSubmit,
  };
};
