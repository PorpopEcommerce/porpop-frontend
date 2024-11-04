// LoginForm.tsx
"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useLoginForm } from "../hooks/useLoginForm";

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
                    <label className="block mb-1 text-sm md:text-base">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username}</p>
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
                            className="w-full border p-2 rounded"
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

                {isAuthenticated ? (
                    <button
                        type="button"
                        className="w-full bg-green-500 text-white p-2 rounded font-bold"
                        disabled
                    >
                        Logged in successfully!
                    </button>
                ) : (
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded font-bold">
                        Login
                    </button>
                )}
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
