import { Product } from "@/app/types/product";
import { useStepContext } from "@mui/material";
import React, { useState } from "react";

interface DiscountFormProps {
    minQuantityForDiscount?: number;
    discountPercentage?: number;
    onChange: (field: keyof Product, value: any) => void;
}

const DiscountForm: React.FC<DiscountFormProps> = ({
    minQuantityForDiscount,
    discountPercentage,
    onChange,
}) => {

    const [isDiscountEnabled, setIsDiscountEnabled] = useState(false)
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
                    <div>
                        <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Minimum quantity
                        </label>
                        <input
                            type="number"
                            min="0" // Ensure the minimum value is 0
                            onChange={(e) => {
                                const value = Math.max(0, Number(e.target.value)); // Ensure value is not below 0
                                e.target.value = value.toString(); // Update the input field value
                            }}
                            placeholder='minimum quantity'
                            className="mt-1  w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Discount %
                        </label>
                        <input
                            type="text"
                            value={discountPercentage}
                            onChange={(e) =>
                                onChange("discountPercentage", e.target.value)
                            }
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiscountForm;
