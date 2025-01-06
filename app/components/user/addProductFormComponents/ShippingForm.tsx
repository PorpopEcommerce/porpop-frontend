import { Product } from "@/app/types/product";
import { useCallback, useState } from "react";

const ShippingForm = ({
  dimensions,
  isShippingManagementEnabled,
  onChange,
}: {
  dimensions: { weight: number; length: number; width: number; height: number };
  shippingClass: string;
  taxStatus: string;
  taxClass: string;
  isShippingManagementEnabled: boolean;
  onChange: (field: any, value: any) => void;
}) => {
  const handleDimensionChange = useCallback(
    (field: keyof typeof dimensions, value: number) => {
      onChange("dimensions", { ...dimensions, [field]: value });
    },
    [dimensions, onChange]
  );


  const [shippingTypeDropdown, setShippingClassTypeDropdown] = useState(false);
  
  
    const handleShippingTypeSelect = (type: string) => {
      onStockTypeChange(type);
      setShippingClassTypeDropdown(false);
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
          checked={isShippingManagementEnabled}
          onChange={(e) =>
            onChange("isShippingManagementEnabled", e.target.checked)
          }
        />
        <label className="text-[12px] font-medium text-gray-700">
          This product requires shipping
        </label>
      </div>

      {isShippingManagementEnabled && (
        <>
          <div className="grid grid-cols-4 p-3 gap-3">
            {["weight", "length", "width", "height"].map((field) => (
              <input
                key={field}
                type="number"
                min="0"
                placeholder={`${field} (cm)`}
                value={dimensions[field as keyof typeof dimensions]}
                onChange={(e) =>
                  handleDimensionChange(
                    field as keyof typeof dimensions,
                    Number(e.target.value)
                  )
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
            ))}
          </div>

          <div className="p-3 relative">
            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Shipping Class
            </label>
            <input
              type="text"
              placeholder={stockType}
              value={stockType}
              readOnly
              onClick={() => setShippingClassTypeDropdown((prev) => !prev)}
              className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
            />
            {shippingTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {[
                  "No shipping class (US$0)",
                  "TVs",
                  "Refrigeration",
                  "Sewing Machine",
                  "Center Table",
                  "Engine",
                  "Generator",
                  "T-Shirts"
                ].map((type) => (
                  <div
                    key={type}
                    onClick={() => handleShippingTypeSelect(type)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <div className="grid grid-cols-2 p-3 gap-3">
        <div className="relative">
          <label className="block text-[12px] font-medium text-gray-700 mb-2">
            Tax Status
          </label>
          <input
            type="text"
            placeholder={stockType}
            value={stockType}
            readOnly
            onClick={() => setStockTypeDropdown((prev) => !prev)}
            className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
          />
          {stockTypeDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {["In Stock", "Out of Stock", "On Backorder"].map((type) => (
                <div
                  key={type}
                  onClick={() => handleStockTypeSelect(type)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-[12px] font-medium text-gray-700 mb-2">
            Tax Class
          </label>
          <input
            type="text"
            placeholder={stockType}
            value={stockType}
            readOnly
            onClick={() => setStockTypeDropdown((prev) => !prev)}
            className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
          />
          {stockTypeDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {["In Stock", "Out of Stock", "On Backorder"].map((type) => (
                <div
                  key={type}
                  onClick={() => handleStockTypeSelect(type)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
