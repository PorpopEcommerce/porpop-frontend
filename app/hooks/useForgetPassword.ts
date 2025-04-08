import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export const useForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/v1/user/forgot-password`, { email });

      if (response.status === 200) {
        const hashToken = response.data.body.hash_token; // Assuming this comes in the response
        

        toast.success("Password reset link sent! Check your email.");

        // Pass hashToken as a query parameter
        router.push(`/reset_password?hashToken=${hashToken}`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        toast.error("Email not found");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

