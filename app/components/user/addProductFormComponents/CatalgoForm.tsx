import React, { useState } from "react";
interface CatalgoFormProps {
  addToCartToggle: boolean;
  productPriceToggle: boolean;
}

const CatalgoForm: React.FC<CatalgoFormProps> = ({
  addToCartToggle,
  productPriceToggle,
}) => {
  const [addToCartToggleType, setAddToCartToggleType] = useState(false); // State for Add to Cart toggle
  const [productPriceToggleType, setProductPriceToggleType] = useState(false); // State for Product Price toggle
 
 
  const onAddToCartToggleTypeChange = (isChecked: boolean) => {
    setAddToCartToggleType(isChecked);
    setAddToCartToggleType(addToCartToggle) 
  };

  const onProdcutPriceToggleTypeChange = (isChecked: boolean) => {
    setProductPriceToggleType(isChecked); // Update Product Price toggle checkbox
    setProductPriceToggleType(productPriceToggle); // Update Product Price toggle checkbox
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

      {/* Add to Cart Toggle */}
      <div className="flex items-center p-3 gap-3">
        <input
          type="checkbox"
          checked={addToCartToggleType}
          onChange={(e) => onAddToCartToggleTypeChange(e.target.checked)}
        />
        <label className="text-[12px] font-medium text-gray-700">
          Check to remove Add to Cart option from your products.
        </label>
      </div>

      {/* Product Price Toggle */}

      <div className="flex items-center p-3 gap-3">
        <input
          type="checkbox"
          checked={productPriceToggleType}
          onChange={(e) => onProdcutPriceToggleTypeChange(e.target.checked)}
        />
        <label className="text-[12px] font-medium text-gray-700">
          Check to hide product price from your products.
        </label>
      </div>
    </div>
  );
};

export default CatalgoForm;
