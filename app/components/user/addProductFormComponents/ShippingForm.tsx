import { useState } from "react";
import { FormProduct } from "@/app/types/formProduct";

interface ShippingFormProps {
  weight: number;
  length: number;
  width: number;
  height: number;
  shippingClass: string;
  taxStatus: string;
  taxClass: string;
  onChange: (field: keyof FormProduct, value: any) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  weight,
  length,
  width,
  height,
  shippingClass,
  taxStatus,
  taxClass,
  onChange,
}) => {
  const [isShippingClassDropdownOpen, setIsShippingClassDropdownOpen] =
    useState(false);
  const [isTaxStatusDropdownOpen, setIsTaxStatusDropdownOpen] = useState(false);
  const [isTaxClassDropdownOpen, setIsTaxClassDropdownOpen] = useState(false);
  const [isShippingRequired, setIsShippingRequired] = useState(false);

  const handleDropdownSelection = (field: keyof FormProduct, value: string) => {
    onChange(field, value);
  };

  return (
    <div className="mb-3 border">
      <div className="p-3 border-b">
        <p className="block text-[14px] font-bold text-gray-700">
          Shipping and Tax{" "}
          <span className="text-[10px] font-light italic">
            Manage shipping and tax for this product
          </span>
        </p>
      </div>

      <div className="p-3 flex gap-3 items-center">
        <input
          type="checkbox"
          checked={isShippingRequired}
          onChange={(e) => setIsShippingRequired(e.target.checked)}
        />
        <label className="text-[12px] font-medium text-gray-700">
          This product requires shipping
        </label>
      </div>

      {isShippingRequired && (
        <>
          {/* Dimensions Inputs */}
          <div className="grid grid-cols-4 p-3 gap-3">
            {[{ field: "weight", value: weight, placeholder: "Weight (kg)" },
              { field: "length", value: length, placeholder: "Length (cm)" },
              { field: "width", value: width, placeholder: "Width (cm)" },
              { field: "height", value: height, placeholder: "Height (cm)" },
            ].map(({ field, value, placeholder }) => (
              <input
                key={field}
                type="number"
                min="0"
                value={value || ""}
                onChange={(e) =>
                  onChange(field as keyof FormProduct, parseFloat(e.target.value) || 0)
                }
                placeholder={placeholder}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
            ))}
          </div>

          {/* Shipping Class */}
          <div className="p-3 relative">
            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Shipping Class
            </label>
            <input
              type="text"
              value={shippingClass}
              readOnly
              onClick={() => setIsShippingClassDropdownOpen((prev) => !prev)}
              className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
            />
            {isShippingClassDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {[
                  "No shipping class",
                  "TVs",
                  "Refrigeration",
                  "Sewing Machine",
                  "Center Table",
                  "Engine",
                  "Generator",
                  "T-Shirts",
                ].map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      handleDropdownSelection("shipping_class", type);
                      setIsShippingClassDropdownOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tax Status */}
          <div className="grid grid-cols-2 p-3 gap-3">
            <div className="relative">
              <label className="block text-[12px] font-medium text-gray-700 mb-2">
                Tax Status
              </label>
              <input
                type="text"
                value={taxStatus}
                readOnly
                onClick={() => setIsTaxStatusDropdownOpen((prev) => !prev)}
                className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
              />
              {isTaxStatusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {["Taxable", "Non-taxable", "Shipping only"].map((type) => (
                    <div
                      key={type}
                      onClick={() => {
                        handleDropdownSelection("tax_status", type);
                        setIsTaxStatusDropdownOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tax Class */}
            <div className="relative">
              <label className="block text-[12px] font-medium text-gray-700 mb-2">
                Tax Class
              </label>
              <input
                type="text"
                value={taxClass}
                readOnly
                onClick={() => setIsTaxClassDropdownOpen((prev) => !prev)}
                className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
              />
              {isTaxClassDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {["Standard", "Reduced rate", "Zero rate"].map((type) => (
                    <div
                      key={type}
                      onClick={() => {
                        handleDropdownSelection("tax_class", type);
                        setIsTaxClassDropdownOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShippingForm;
