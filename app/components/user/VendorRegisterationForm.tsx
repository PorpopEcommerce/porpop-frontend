import { useVendorRegistration } from "../../hooks/useVendorRegistration";
import Button from "../product/Button";



const VendorForm = ({ userId }: { userId: string }) => {
    const {
        formData,
        formErrors,
        isSubmitting,
        submitSuccess,
        handleInputChange,
        handleSubmit,
    } = useVendorRegistration(userId);

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Update Account to Vendor
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                {/* Shop Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                    <input
                        type="text"
                        value={formData.shopName}
                        onChange={(e) => handleInputChange("shopName", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    {formErrors.shopName && <p className="text-red-500 text-sm">{formErrors.shopName}</p>}
                </div>

                {/* Shop Url */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Shop Url</label>
                    <input
                        type="text"
                        value={formData.shopUrl}
                        onChange={(e) => handleInputChange("shopUrl", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    {formErrors.shopUrl && <p className="text-red-500 text-sm">{formErrors.shopUrl}</p>}
                </div>

                {/* Shop Logo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                </div>

                {/* Company ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Company ID/EUD Number</label>
                    <input
                        type="text"
                        value={formData.companyId}
                        onChange={(e) => handleInputChange("companyId", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    {formErrors.companyId && <p className="text-red-500 text-sm">{formErrors.companyId}</p>}
                </div>

                {/* VAT/TAX ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">VAT/TAX ID</label>
                    <input
                        type="text"
                        value={formData.vatId}
                        onChange={(e) => handleInputChange("vatId", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    {formErrors.vatId && <p className="text-red-500 text-sm">{formErrors.vatId}</p>}
                </div>

                {/* Bank Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name of Bank</label>
                    <input
                        type="text"
                        value={formData.bankName}
                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    {formErrors.bankName && <p className="text-red-500 text-sm">{formErrors.bankName}</p>}
                </div>

                {/* Account / IBAN */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Account / IBAN</label>
                    <input
                        type="text"
                        value={formData.accountNumber}
                        onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    {formErrors.accountNumber && <p className="text-red-500 text-sm">{formErrors.accountNumber}</p>}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        required
                        className="mr-2"
                    />
                    <label className="text-sm">I have read and agree to the Terms and Conditions</label>
                </div>

                {/* Submit Button */}
                <div className="w-full max-w-[200px]">
                    <Button label={isSubmitting ? "Submitting..." : "Become a Vendor"} disabled={isSubmitting} />
                </div>

                {/* Success or Error Messages */}
                {submitSuccess === true && <p className="text-green-500">Vendor updated successfully!</p>}
                {submitSuccess === false && <p className="text-red-500">Failed to update vendor details.</p>}
            </form>
        </div>
    );
};

export default VendorForm;
