import React from "react";

interface ProductTypeFormProps {
  productType: string;
  onProductTypeChange: (type: string) => void;
}

const ProductTypeForm: React.FC<ProductTypeFormProps> = ({
  productType,
  onProductTypeChange,
}) => {
  const [productTypeDropdown, setProductTypeDropdown] = React.useState(false);

  const handleProductTypeSelect = (type: string) => {
    onProductTypeChange(type); // Update the productType in the parent
    setProductTypeDropdown(false); // Close the dropdown
  };

  return (
    <div>
      {/* Product Type Input */}
      <div className="mb-3 relative">
        <label className="block text-[12px] font-bold text-gray-700 mb-2">
          Product Type
        </label>
        <input
          type="text"
          placeholder={productType} // Placeholder updates to the selected product type
          value={productType} // Reflect the selected product type in the input field
          readOnly
          onClick={() => setProductTypeDropdown((prev) => !prev)} // Toggle dropdown visibility
          className="mt-1 block bg-[#111827] w-full p-2 border border-gray-300 rounded-md focus:outline-none cursor-pointer"
        />

        {/* Dropdown Container */}
        {productTypeDropdown && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {["Simple", "Variable", "External/Affiliate", "Group"].map((type) => (
              <div
                key={type}
                onClick={() => handleProductTypeSelect(type)} // Handle selection
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTypeForm;
