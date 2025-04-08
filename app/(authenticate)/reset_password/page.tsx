"use client";

import { useState, useMemo } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useResetPassword } from "@/app/hooks/useResetPassword";

const ResetPassword = () => {
  const {
    password,
    otp,
    isLoading,
    handlePasswordChange,
    handleOtpChange,
    handleOtpKeyDown,
    handleSubmit,
  } = useResetPassword();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const validationRules = {
    hasUppercase: { regex: /[A-Z]/, message: "At least one uppercase letter" },
    hasLowercase: { regex: /[a-z]/, message: "At least one lowercase letter" },
    hasNumber: { regex: /[0-9]/, message: "At least one number" },
    hasSpecialChar: {
      regex: /[@$!%*?&#]/,
      message: "At least one special character",
    },
    isMinLength: {
      test: (password: string) => password.length >= 8,
      message: "Minimum 8 characters",
    },
  };

  const passwordValidation = useMemo(() => {
    return Object.keys(validationRules).reduce((acc, key) => {
      const rule = validationRules[key as keyof typeof validationRules];

      // Check if the rule has a regex or test function
      if ("regex" in rule) {
        acc[key] = rule.regex.test(password);
      } else if ("test" in rule) {
        acc[key] = rule.test(password);
      }

      return acc;
    }, {} as Record<string, boolean>);
  }, [password]);

  return (
    <div className="h-screen bg-white flex justify-center">
      <div className="p-5 mt-10 max-w-[30rem] w-full">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="relative">
            <div>
              <p className="text-md">New password</p>
              <div className="relative mt-3">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-sm"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>
            </div>

            {/* Mapped Password Validation Checklist */}
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(validationRules).map(([key, rule]) => (
                <li
                  key={key}
                  className={`flex items-center ${
                    passwordValidation[key] ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {passwordValidation[key] ? "✓" : "✗"} {rule.message}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-md">Enter OTP token</p>
            <div className="flex gap-2 mt-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9bf618]"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#9bf618] text-white rounded-md p-3 mt-5 w-full"
            disabled={
              isLoading || Object.values(passwordValidation).includes(false)
            }
          >
            {isLoading ? "Processing..." : "Proceed"}
          </button>
        </form>

        <div className="w-full flex justify-end mt-3">
          <a href="/" className="text-sm hover:opacity-50">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
