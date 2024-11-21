// LoginForm.tsx
"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useLoginForm } from "../../hooks/useLoginForm";
import Button from "../product/Button";

const LoginForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { formData, errors, errMsg, isAuthenticated, handleChange, handleSubmit, } = useLoginForm();

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

            <p className="text-red-500 text-sm">{errMsg}</p>


            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
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
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <Button
                    label={isAuthenticated ? "Logged in successfully" : "Login"}
                    onClick={() => { handleSubmit }}
                />
            </form>


            <div className="flex items-center mt-6 mb-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <h1 className="px-4 font-bold text-center text-sm md:text-base">OR LOGIN WITH</h1>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button className="w-full bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center relative">
                <FcGoogle className="absolute left-3 text-lg bg-white rounded-full" />
                <span>Google</span>
            </button>
        </div>
    );
};

export default LoginForm;