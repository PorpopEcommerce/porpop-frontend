"use client";

import { useRegisterForm } from "../../hooks/useRegisterForm";

const RegisterForm: React.FC = () => {
    const {
        formType,
        formData,
        formErrors,
        agreeToTerms,
        isFormValid,
        isSubmitting,
        submitSuccess,
        handleInputChange,
        handleFormTypeChange,
        setAgreeToTerms,
        handleSubmit,
    } = useRegisterForm();

    return (  
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
            {submitSuccess !== null && (
                <p className={`text-sm ${submitSuccess ? "text-green-600" : "text-red-600"}`}>
                    {submitSuccess ? "Registration successful!" : "Registration failed. Please check your input."}
                </p>
            )}
            <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                </div>

                {/* Vendor-specific Fields */}
                {formType === "vendor" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                            <input
                                type="text"
                                placeholder="Shop Name"
                                value={formData.shopName || ""}
                                onChange={(e) => handleInputChange("shopName", e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.shopName && <p className="text-red-500 text-sm">{formErrors.shopName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Shop Description</label>
                            <textarea
                                placeholder="Shop Description"
                                value={formData.shopDescription || ""}
                                onChange={(e) => handleInputChange("shopDescription", e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                            {formErrors.shopDescription && <p className="text-red-500 text-sm">{formErrors.shopDescription}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={formData.city || ""}
                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    value={formData.zipCode || ""}
                                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                {formErrors.zipCode && <p className="text-red-500 text-sm">{formErrors.zipCode}</p>}
                            </div>
                        </div>
                    </>
                )}


            </form>

            <div className="flex flex-col space-y-4 mb-6">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="mr-2"
                    />
                    I have read and agree to the Terms and Condition.
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="formType"
                        value="user"
                        checked={formType === "user"}
                        onChange={() => handleFormTypeChange("user")}
                        className="mr-2"
                    />
                    I am a Customer
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="formType"
                        value="vendor"
                        checked={formType === "vendor"}
                        onChange={() => handleFormTypeChange("vendor")}
                        className="mr-2"
                    />
                    I am a Vendor
                </label>
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-2 px-4 font-semibold rounded-md focus:outline-none ${isFormValid ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-700"
                    }`}
            >
                {isSubmitting ? "Submitting..." : "Register"}
            </button>
        </div>
    );
};

export default RegisterForm;
