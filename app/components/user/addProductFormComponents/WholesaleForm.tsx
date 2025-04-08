import { FormProduct } from "@/app/types/formProduct";
import React, { useState } from "react";

interface WholesaleFormProps {
  min_quantity_for_wholesales?: number;
  wholesales_price?: number;
  onChange: (field: keyof FormProduct, value: any) => void;
}

const WholesaleForm: React.FC<WholesaleFormProps> = ({
  min_quantity_for_wholesales,
  wholesales_price,
  onChange,
}) => {
  const [isWholesaleEnabled, setIsWholesaleEnabled] = useState(false);

  return (
    <div className="mb-3 border">
      <div className="p-3 border-b">
        <p className="block text-[14px] font-bold text-white">
          Wholesale Options{" "}
          <span className="text-[10px] font-light italic">
            If you want to sell this product as wholesale then set your setting
            to the right way
          </span>
        </p>
      </div>
      <div className="p-3 flex gap-3 items-center">
        <input
          type="checkbox"
          checked={isWholesaleEnabled}
          onChange={(e) => setIsWholesaleEnabled(e.target.checked)}
        />
        <label className="text-[12px] font-medium text-white">
          Enable wholesale for this product
        </label>
      </div>

      {isWholesaleEnabled && (
        <div className="p-3 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-medium text-white mb-2">
              Minimum quantity for wholesale
            </label>
            <input
              type="number"
              min="0" // Ensure the minimum value is 0
              value={min_quantity_for_wholesales || ""}
              onChange={(e) =>
                onChange(
                  "min_quantity_for_wholesales",
                  parseInt(e.target.value, 10) || 0
                )
              }
              placeholder="minimum quantity"
              className="mt-1 bg-[#111827] w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-white mb-2">
              Wholesale price:
            </label>
            <input
              type="number"
              min="0"
              value={wholesales_price || 0}
              onChange={(e) =>
                onChange(
                  "wholesales_price",
                  parseFloat(e.target.value) || 0
                )
              }
              className="mt-1 bg-[#111827] block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesaleForm;
