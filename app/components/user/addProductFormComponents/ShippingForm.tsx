import { Product } from "@/app/types/product";
import { useCallback } from "react";

const ShippingForm = ({
    dimensions,
    shippingClass,
    taxStatus,
    taxClass,
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
                    onChange={(e) => onChange("isShippingManagementEnabled", e.target.checked)}
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
                                    handleDimensionChange(field as keyof typeof dimensions, Number(e.target.value))
                                }
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        ))}
                    </div>

                    <div className="p-3">
                        <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Shipping Class
                        </label>
                        <input
                            type="text"
                            value={shippingClass}
                            readOnly
                            onClick={() => onChange("shippingClass", "TVs")} // Example update logic
                            className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
                        />
                    </div>
                </>
            )}

            <div className="grid grid-cols-2 p-3 gap-3">
                <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Tax Status</label>
                    <input
                        type="text"
                        value={taxStatus}
                        readOnly
                        onClick={() => onChange("taxStatus", "None")} // Example update logic
                        className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
                    />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Tax Class</label>
                    <input
                        type="text"
                        value={taxClass}
                        readOnly
                        onClick={() => onChange("taxClass", "Zero rate")} // Example update logic
                        className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default ShippingForm;