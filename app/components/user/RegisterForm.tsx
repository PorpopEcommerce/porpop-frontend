"use client";

import { useRegisterForm } from "../../hooks/useRegisterForm";

const RegisterForm: React.FC = () => {
    const {
        formData,
        formErrors,
        agreeToTerms,
        isFormValid,
        isSubmitting,
        submitSuccess,
        handleInputChange,
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
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
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
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
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
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
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                    />
                    {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                    />
                    {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                        />
                        {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <input
                            type="number"
                            placeholder="Postal code"
                            value={formData.postalcode}
                            onChange={(e) => handleInputChange("postalcode", e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                        />
                        {formErrors.postalcode && <p className="text-red-500 text-sm">{formErrors.postalcode}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            placeholder="Country"
                            value={formData.country}
                            onChange={(e) => handleInputChange("country", e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                        />
                        {formErrors.country && <p className="text-red-500 text-sm">{formErrors.country}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                        />
                        {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                    </div>
                </div>


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