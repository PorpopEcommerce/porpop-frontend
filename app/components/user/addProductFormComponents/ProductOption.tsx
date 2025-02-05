import { FormProduct } from "@/app/types/formProduct";
import { useState } from "react";

interface ProductOptionProps {
  reviewType: boolean;
  onReviewTypeChange: (type: boolean) => void;
  productStatusType: string;
  visibilityType: string;
  purchase_note?: string;
  onChange: (field: keyof FormProduct, value: any) => void;
}

const ProductOption: React.FC<ProductOptionProps> = ({
  productStatusType,
  visibilityType,
  onChange,
  purchase_note,
  reviewType,
  onReviewTypeChange,
}) => {
  const [productStatusTypeDropdown, setProductStatusTypeDropdown] =
    useState(false);
  const [visibilityTypeDropdown, setVisibilityTypeDropdown] = useState(false);

  const handleTypeSelection = (field: keyof FormProduct, value: string) => {
    onChange(field, value);
  };

  return (
    <div className="mb-3 border">
      <div className="p-3 border-b">
        <p className="block text-[14px] font-bold text-white">
          Other Options{" "}
          <span className="text-[10px] font-light italic">
            Set your extra product options
          </span>
        </p>
      </div>

      <div className="p-3 grid grid-cols-2 gap-3">
        {/* Product Status Dropdown */}
        <div className="relative">
          <label className="block text-[12px] font-medium text-white mb-2">
            Product Status
          </label>
          <input
            type="text"
            placeholder="Select Product Status"
            value={productStatusType}
            readOnly
            onClick={() => setProductStatusTypeDropdown((prev) => !prev)}
            className="mt-1 block bg-[#111827] w-full p-2 border text-white border-gray-300 rounded-md focus:outline-none cursor-pointer"
          />
          {productStatusTypeDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-[#111827] border border-gray-300 rounded-md shadow-lg z-10">
              {["Online", "Draft"].map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    handleTypeSelection("product_status", type);
                    setProductStatusTypeDropdown(false);
                  }}
                  className="p-2 hover:bg-[#1f2937] cursor-pointer"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visibility Dropdown */}
        <div className="relative">
          <label className="block text-[12px] font-medium text-gray-700 mb-2">
            Visibility
          </label>
          <input
            type="text"
            placeholder="Select Visibility"
            value={visibilityType}
            readOnly
            onClick={() => setVisibilityTypeDropdown((prev) => !prev)}
            className="mt-1 block bg-[#111827] w-full p-2 border text-white border-gray-300 rounded-md focus:outline-none cursor-pointer"
          />
          {visibilityTypeDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-[#111827] border border-gray-300 rounded-md shadow-lg z-10">
              {["Visible", "Catalog", "Search", "Hidden"].map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    handleTypeSelection("visibility", type);
                    setVisibilityTypeDropdown(false);
                  }}
                  className="p-2 hover:bg-[#1f2937] cursor-pointer"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Note */}
      <div className="p-3">
        <label className="block text-[12px] font-medium text-white mb-2">
          Product Note
        </label>
        <textarea
          cols={30}
          rows={5}
          placeholder="Customer will get this info in their order email"
          className="block w-full px-4 py-2 mb-4 bg-[#111827] rounded-md border border-gray-300 focus:outline-none"
          value={purchase_note || ""}
          onChange={(e) => onChange("purchase_note", e.target.value)}
        ></textarea>
      </div>

      {/* Enable Reviews */}
      <div className="flex items-center p-3 gap-3">
        <input
          type="checkbox"
          checked={reviewType}
          onChange={(e) => onReviewTypeChange(e.target.checked)}
        />
        <label className="text-[12px] font-medium text-white">
          Enable product reviews
        </label>
      </div>
    </div>
  );
};

export default ProductOption;
