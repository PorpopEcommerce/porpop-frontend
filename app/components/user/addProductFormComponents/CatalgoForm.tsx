import React, { useState } from "react";

const CatalgoForm = () => {
  const [addToCartToggleType, setAddToCartToggleType] = useState(false); // State for Add to Cart toggle
  const [productPriceToggleType, setProductPriceToggleType] = useState(false); // State for Product Price toggle
  const [productPriceToggle, setProductPriceToggle] = useState(false); // Determines whether to show the Product Price toggle section

  const onAddToCartToggleTypeChange = (isChecked: boolean) => {
    setAddToCartToggleType(isChecked); // Update Add to Cart checkbox
    if (isChecked) {
      setProductPriceToggle(true); // Enable the Product Price toggle section
      setProductPriceToggleType(true); // Set Product Price toggle checkbox to true
    } else {
      setProductPriceToggle(false); // Disable the Product Price toggle section
      setProductPriceToggleType(false); // Reset Product Price toggle checkbox to false
    }
  };

  const onProdcutPriceToggleTypeChange = (isChecked: boolean) => {
    setProductPriceToggleType(isChecked); // Update Product Price toggle checkbox
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
      {productPriceToggle && (
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
      )}
    </div>
  );
};

export default CatalgoForm;
