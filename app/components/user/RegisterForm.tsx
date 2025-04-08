"use client";

import { useRegisterForm } from "../../hooks/useRegisterForm";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, useMemo, useEffect } from "react";

interface RegisterFormProp {
  setVerifyComponent: (value: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProp> = ({ setVerifyComponent }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    formData,
    formErrors,
    agreeToTerms,
    isFormValid,
    isSubmitting,
    submitSuccess,
    verificationToken,
    handleInputChange,
    setAgreeToTerms,
    handleSubmit,
  } = useRegisterForm();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // When the form submission is successful, update the parent state
  useEffect(() => {
    if (submitSuccess === true && verificationToken === true) {
      setVerifyComponent(true);
    }
  }, [submitSuccess, verificationToken, setVerifyComponent]);

  // Memoized password validation checks
  const passwordValidation = useMemo(() => {
    const { password } = formData;
    return {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[@$!%*?&#]/.test(password),
      isMinLength: password.length >= 8,
    };
  }, [formData.password]);

  return (
    <div className="w-full">
      <form className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
            />
            {formErrors.first_name && (
              <p className="text-red-500 text-sm">{formErrors.first_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
            />
            {formErrors.last_name && (
              <p className="text-red-500 text-sm">{formErrors.last_name}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
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

            {/* Password Validation Checklist */}
            <ul className="mt-2 space-y-1 text-sm">
              <li
                className={`flex items-center ${
                  passwordValidation.hasUppercase
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {passwordValidation.hasUppercase ? "✓" : "✗"} At least one
                uppercase letter
              </li>
              <li
                className={`flex items-center ${
                  passwordValidation.hasLowercase
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {passwordValidation.hasLowercase ? "✓" : "✗"} At least one
                lowercase letter
              </li>
              <li
                className={`flex items-center ${
                  passwordValidation.hasNumber
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {passwordValidation.hasNumber ? "✓" : "✗"} At least one number
              </li>
              <li
                className={`flex items-center ${
                  passwordValidation.hasSpecialChar
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {passwordValidation.hasSpecialChar ? "✓" : "✗"} At least one
                special character
              </li>
              <li
                className={`flex items-center ${
                  passwordValidation.isMinLength
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {passwordValidation.isMinLength ? "✓" : "✗"} Minimum 8
                characters
              </li>
            </ul>
          </div>
        </div>
      </form>

      <div className="flex flex-col space-y-4 mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mr-2 text-[#9bf618]"
          />
          I have read and agree to the Terms and Condition.
        </label>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
        className={`w-full py-2 px-4 font-semibold rounded-md focus:outline-none ${
          isFormValid
            ? "bg-[#9bf618] hover:bg-[#8cb850] text-white"
            : "bg-[#78964f] text-gray-700"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Register"}
      </button>
    </div>
  );
};

export default RegisterForm;
