"use client"

import React from "react";
import Link from "next/link";
import { useForgetPassword } from "@/app/hooks/useForgetPassword";

const ForgetPassword = () => {
  const { email, isLoading, handleChange, handleSubmit } = useForgetPassword();

  return (
    <div className="h-screen bg-white flex justify-center">
      <div className="p-5 mt-20 max-w-[30rem] w-full">
        <h1 className="text-3xl font-bold text-center">Forgot Password?</h1>
        <p className="mt-5 text-gray-600">
          Enter your email address to reset your password.
        </p>

        {/* Input Field for Email */}
        <form onSubmit={handleSubmit}>
          <input
            className="border-2 border-gray-300 rounded-md p-3 w-full mt-5 focus:outline-none"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
          />

          {/* Button for Submit */}
          <button
            type="submit"
            className="bg-[#9bf618] text-white rounded-md p-3 mt-5 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>

        <div className="w-full flex justify-end mt-2">
          <Link href="/">
            <span className="text-sm hover:opacity-50">Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
