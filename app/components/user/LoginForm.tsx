"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginForm } from "../../hooks/useLoginForm";
import Button from "../product/Button";
import Link from "next/link";

const LoginForm = ({ toggleSignIn }: { toggleSignIn: () => void }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { formData, errors, handleChange, handleSubmit, isLoading } =
    useLoginForm(toggleSignIn);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div className="w-full">
      <form className="flex flex-col space-y-4">
        <div>
          <label className="block mb-1 text-sm md:text-base">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm md:text-base">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-sm"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <div className="flex justify-end mt-2">
            <Link href="/forget_password">
              <span className="text-sm cursor-pointer hover:opacity-50">
                Forget password?
              </span>
            </Link>
          </div>
        </div>

        <Button
          label={isLoading ? "Loading..." : "Login"}
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default LoginForm;
