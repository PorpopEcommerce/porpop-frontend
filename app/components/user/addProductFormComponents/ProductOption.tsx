import { FormProduct } from "@/app/types/formProduct";
import { useState } from 'react'


interface ProductOptionProps {
    reviewType: boolean;
    onReviewTypeChange: (type: boolean) => void;
    productStatusType: string;
    visibilityType: string;
    purchase_note?: string;
    onProductStatusTypeChange: (type: string) => void;
    onVisibilityTypeChange: (type: string) => void;
    onChange: (field: keyof FormProduct, value: any) => void;
}
const ProductOption: React.FC<ProductOptionProps> = ({ productStatusType, visibilityType, onProductStatusTypeChange, onVisibilityTypeChange, onChange, purchase_note, reviewType, onReviewTypeChange }) => {
    const [productStatusTypeDropdown, setProductStatusTypeDropdown] = useState(false);
    const [visibilityTypeDropdown, setVisibilityTypeDropdown] = useState(false);

    const handleProductStatusTypeSelect = (type: string) => {
        onProductStatusTypeChange(type);
        setProductStatusTypeDropdown(false);
    };

    const handleVisibilityTypeSelect = (type: string) => {
        onVisibilityTypeChange(type);
        setVisibilityTypeDropdown(false);
    };

    return (
        <div className="mb-3 border">
            <div className="p-3 border-b">
                <p className="block text-[14px] font-bold text-gray-700">
                    Other Options{" "}
                    <span className="text-[10px] font-light italic">
                        Set your extra product options
                    </span>
                </p>
            </div>

            <div className="p-3 grid grid-cols-2 gap-3">
                <div className='relative'>
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">
                        Product Status
                    </label>
                    <input
                        type="text"
                        placeholder={productStatusType}
                        value={productStatusType}
                        readOnly
                        onClick={() => setProductStatusTypeDropdown((prev) => !prev)}
                        className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
                    />
                    {productStatusTypeDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {["Online", "Draft"].map((type) => (
                                <div
                                    key={type}
                                    onClick={() => handleProductStatusTypeSelect(type)}
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
                        Visibility
                    </label>
                    <input
                        type="text"
                        placeholder={visibilityType}
                        value={visibilityType}
                        readOnly
                        onClick={() => setVisibilityTypeDropdown((prev) => !prev)}
                        className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
                    />
                    {visibilityTypeDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {["Visible", "Catalog", "Search", "Hidden"].map((type) => (
                                <div
                                    key={type}
                                    onClick={() => handleVisibilityTypeSelect(type)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='p-3'>
                <label className="block text-[12px] font-medium text-gray-700 mb-2">
                    Product Note
                </label>

                <textarea
                    cols={30}
                    rows={5}
                    placeholder='Customer will get this info in their order email'
                    className="block w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none"
                    value={purchase_note}
                    onChange={(e) =>
                        onChange("purchase_note", e.target.value)
                    }

                ></textarea>
            </div>

            <div className="flex items-center p-3 gap-3">
                <input
                    type="checkbox"
                    checked={reviewType}
                    onChange={(e) => onReviewTypeChange(e.target.checked)}
                />
                <label className="text-[12px] font-medium text-gray-700">
                    Enable product reviews
                </label>
            </div>
        </div>
    )
}

export default ProductOption
