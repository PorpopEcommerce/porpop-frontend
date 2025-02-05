import React from "react";
import { FormProduct } from "@/app/types/formProduct";


interface MinMaxFormProps {
  min_order: number;
  max_order: number;
  onChange: (field: keyof FormProduct, value: any) => void;
}

const MinMaxForm: React.FC<MinMaxFormProps> = ({
  min_order,
  max_order,
  onChange,
}) => {
  return (
    <div className="mb-3 border">
      <div className="p-3 border-b">
        <p className="block text-[14px] font-bold text-white">
          Min/Max Options{" "}
          <span className="text-[10px] font-light italic">
            Manage min and max option for this product
          </span>
        </p>
      </div>
      <div className="p-3 space-y-2">
        <div className="lg:max-w-[50%] w-full">
          <label className="block text-[12px] font-medium text-white mb-2">
            Minimum quantity to order
          </label>
          <input
            type="number"
            min="0" // Ensure the minimum value is 0
            value={min_order || ""}
            onChange={(e) =>
              onChange("min_order", parseInt(e.target.value, 10) || 0)
            }
            placeholder="Minimum quantity"
            className="mt-1 bg-[#111827] w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="lg:max-w-[50%] w-full">
          <label className="block text-[12px] font-medium text-white mb-2">
            Maximum quantity to order
          </label>
          <input
            type="number"
            min="0" // Ensure the minimum value is 0
            value={max_order || ""}
            onChange={(e) =>
              onChange("max_order", parseInt(e.target.value, 10) || 0)
            }
            placeholder="Maximum Quantity"
            className="mt-1 bg-[#111827] w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <span className="text-[10px] font-light italic">
          Please leave both fields empty or set to 0 to disable the minimum and
          maximum product quantity. Ensure the minimum quantity is not greater
          than the maximum quantity.
        </span>
      </div>
    </div>
  );
};

export default MinMaxForm;
