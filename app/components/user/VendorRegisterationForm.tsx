import { useVendorRegistration } from "../../hooks/useVendorRegistration";
import { FaCamera } from "react-icons/fa";

const VendorForm = () => {
  const {
    formData,
    formErrors,
    isSubmitting,
    isFormValid,
    submitSuccess,
    handleInputChange,
    handleSubmit,
    handleImageChange,
    previewUrl,
    agreeToTerms,
    setAgreeToTerms,
  } = useVendorRegistration();

  return (
    <div className="w-full text-white">
      <h2 className="text-2xl font-bold text-white mb-6">
        Update Account to Vendor
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* Shop Name */}
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col justify-around">
            <div>
              <label className="block text-sm font-medium text-white">
                Shop Name
              </label>
              <input
                type="text"
                value={formData.shop_name}
                onChange={(e) => handleInputChange("shop_name", e.target.value)}
                className="mt-1 bg-[#111827] block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
              {formErrors.shop_name && (
                <p className="text-red-500 text-sm">{formErrors.shop_name}</p>
              )}
            </div>

            {/* Shop Url */}
            <div>
              <label className="block text-sm font-medium text-white">
                Shop Url
              </label>
              <input
                type="text"
                value={formData.shop_url}
                onChange={(e) => handleInputChange("shop_url", e.target.value)}
                className="mt-1 bg-[#111827] block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
              {formErrors.shop_url && (
                <p className="text-red-500 text-sm">{formErrors.shop_url}</p>
              )}
            </div>
          </div>
          {/* Image Upload */}
          <div className="relative w-[200px] h-[200px]">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
            />

            {/* Circle Container */}
            <label
              htmlFor="imageUpload"
              className="w-full h-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 border-2 border-gray-400 rounded-full cursor-pointer transition-all"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaCamera className="text-white text-2xl" />
              )}
            </label>
          </div>
        </div>

        {/* Shop Description */}
        <div>
          <label className="block text-sm font-medium text-white">
            Shop Description
          </label>
          <textarea
            value={formData.shop_description}
            onChange={(e) =>
              handleInputChange("shop_description", e.target.value)
            }
            className="mt-1 bg-[#111827] block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          {formErrors.shop_description && (
            <p className="text-red-500 text-sm">
              {formErrors.shop_description}
            </p>
          )}
        </div>

        {/* Street */}
        <div>
          <label className="block text-sm font-medium text-white">Street</label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
            className="mt-1 bg-[#111827] block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          {formErrors.street && (
            <p className="text-red-500 text-sm">{formErrors.street}</p>
          )}
        </div>

        {/* City and Country */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-sm font-medium text-white">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="mt-1 bg-[#111827] block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {formErrors.city && (
              <p className="text-red-500 text-sm">{formErrors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="mt-1 bg-[#111827] block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {formErrors.country && (
              <p className="text-red-500 text-sm">{formErrors.country}</p>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            required
            className="mr-2"
          />
          <label className="text-sm">
            I have read and agree to the Terms and Conditions
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-2 px-4 font-semibold rounded-md focus:outline-none ${
            isFormValid
              ? "bg-[#9bf618] hover:bg-[#8cb850] text-white"
              : "bg-[#78964f] text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Become a Vendor"}
        </button>
      </form>
    </div>
  );
};

export default VendorForm;
