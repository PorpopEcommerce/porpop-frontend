"use client";

import { useState } from "react";


interface ProductHeaderProp {
  handleAddProductClick: () => void;
  handleViewProductClick: () => void;
  handleImportAliProduct: () => void;
}

const ProductHeader: React.FC<ProductHeaderProp> = ({
  handleAddProductClick,
  handleViewProductClick,
  handleImportAliProduct,
}) => {
  const [counts, setCounts] = useState({
    all: 0,
    online: 0,
    draft: 0,
    inStock: 0,
  });


  return (
    <>
      <div className="md:flex md:justify-between mb-3">
        <div className="mb-3 md:mb-0">
          <ul className="flex gap-2 items-center text-sm text-[#84788c]">
            <li className="cursor-pointer" onClick={handleViewProductClick}>
              All ({counts.all})
            </li>
            <li>Online ({counts.online})</li>
            <li>Draft ({counts.draft})</li>
            <li>In Stock ({counts.inStock})</li>
          </ul>
        </div>
        <div className="flex items-end gap-4">
          <button
            className="max-w-[fit-content] text-sm hover:text-gray-400"
            onClick={handleAddProductClick}
          >
            + Add Product
          </button>
          <button
            className="max-w-[fit-content] text-sm hover:text-gray-400"
            onClick={handleImportAliProduct}
          >
            Import Product from AliExpress
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductHeader;
