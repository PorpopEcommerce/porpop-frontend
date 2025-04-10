import axios from "axios";
import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export const useVerify = (onSuccess?: () => void) => {
  const router = useRouter();
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false); // Added loading state
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(OTP_LENGTH).fill(null)
  );

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = otp.join(""); // The OTP is the token

    if (token.length !== OTP_LENGTH) {
      toast.warn("Please enter all 6 digits! ⚠️");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.put(
        `${BASE_URL}/v1/user/verify-account?token=${token}`
      );

      if (response.status !== 200) throw new Error("Verification failed");

      toast.success("Email Verified Successfully! ✅");
      if (onSuccess) {
        onSuccess();
      }
      router.push("/"); // Redirect after successful verification
      toast.success("Please log in to continue...")
    } catch (error) {
        toast.error("Invalid OTP, please try again. ❌");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return {
    otp,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleSubmit,
    loading, // Return loading state
  };
};
