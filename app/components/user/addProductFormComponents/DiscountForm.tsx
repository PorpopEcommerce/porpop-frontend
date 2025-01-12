import { FormProduct } from "@/app/types/formProduct";
import React, { useState } from "react";

interface DiscountFormProps {
  min_quantity_for_discount?: number;
  discount_percentage?: number;
  onChange: (field: keyof FormProduct, value: any) => void;
}

const DiscountForm: React.FC<DiscountFormProps> = ({
  min_quantity_for_discount,
  discount_percentage,
  onChange,
}) => {
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);

  return (
    <div className="mb-3 border">
      <div className="p-3 border-b">
        <p className="block text-[14px] font-bold text-gray-700">
          Discount Options{" "}
          <span className="text-[10px] font-light italic">
            Set your discount for this product
          </span>
        </p>
      </div>
      <div className="p-3 flex gap-3 items-center">
        <input
          type="checkbox"
          checked={isDiscountEnabled}
          onChange={(e) => setIsDiscountEnabled(e.target.checked)}
        />
        <label className="text-[12px] font-medium text-gray-700">
          Enable bulk discount
        </label>
      </div>

      {isDiscountEnabled && (
        <div className="p-3 grid grid-cols-2 gap-3">
          {/* Minimum Quantity Input */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Minimum quantity
            </label>
            <input
              type="number"
              min="0"
              value={min_quantity_for_discount || ""}
              onChange={(e) =>
                onChange(
                  "min_quantity_for_discount",
                  parseInt(e.target.value, 10) || 0
                )
              }
              placeholder="Minimum Quantity"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {/* Discount Percentage Input */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Discount %
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={discount_percentage || ""}
              onChange={(e) =>
                onChange(
                  "discount_percentage",
                  parseFloat(e.target.value) || 0
                )
              }
              placeholder="Discount Percentage"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountForm;
