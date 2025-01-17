import React from "react";

interface CatalogFormProps {
  addToCartToggle: boolean;
  productPriceToggle: boolean;
  onAddToCartChange: (type: boolean) => void; // Callback to update state in the parent
  onAllowHidePriceChange: (type: boolean) => void; // Callback to update state in the parent
}

const CatalogForm: React.FC<CatalogFormProps> = ({
  addToCartToggle,
  productPriceToggle,
  onAddToCartChange,
  onAllowHidePriceChange, // Callback to update state in the parent
}) => {
  return (
    <div className="mb-3 border">
      <div className="p-3 border-b">
        <p className="block text-[14px] font-bold text-gray-700">
          Catalog Mode{" "}
          <span className="text-[10px] font-light italic">
            Enable/Disable Catalog Mode for this product
          </span>
        </p>
      </div>

      {/* Add to Cart Toggle */}
      <div className="flex items-center p-3 gap-3">
        <input
          type="checkbox"
          checked={addToCartToggle}
          onChange={(e) => onAddToCartChange( e.target.checked)} // Update parent state
        />
        <label className="text-[12px] font-medium text-gray-700">
          Check to remove Add to Cart option from your products.
        </label>
      </div>

      {/* Product Price Toggle */}
      <div className="flex items-center p-3 gap-3">
        <input
          type="checkbox"
          checked={productPriceToggle}
          onChange={(e) => onAllowHidePriceChange(e.target.checked)} // Update parent state
        />
        <label className="text-[12px] font-medium text-gray-700">
          Check to hide product price from your products.
        </label>
      </div>
    </div>
  );
};

export default CatalogForm;
