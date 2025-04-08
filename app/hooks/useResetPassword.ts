import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation"; // Import searchParams

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;


export const useResetPassword = () => {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get hashToken from URL
  const hashToken = searchParams.get("hashToken");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Ensure only numbers are entered
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      toast.error("Please enter the full OTP");
      return;
    }

    if (!hashToken) {
      toast.error("Invalid reset link. Please request a new one.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.patch(`${BASE_URL}/v1/user/reset-password`, {
        password: password,
        otp_token: otp.join(""),
        hash_token: hashToken, // Use hashToken from URL
      });

      if (response.status === 200) {
        toast.success("Password reset successful!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    otp,
    isLoading,
    handlePasswordChange,
    handleOtpChange,
    handleOtpKeyDown,
    handleSubmit,
  };
};
