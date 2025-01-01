"use client";

import { useState } from "react";
import AddProduct from "./addProduct/AddProduct";
import ProductHeader from "./ProductHeader";
import ProductList from "./productReview/ProductList";
import EditProductForm from "./editProduct/EditProductForm";
import Button from "@/app/components/product/Button";

const Product = () => {
  const [isProductActive, setIsProductActive] = useState(false);
  const [productSelectedOption, setProductSelectedOption] =
    useState("importComponent");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [showProductSelectedOption, setShowProductSelectedOption] =
    useState(true);

  const checkActiveProduct = () => {};

  const handleAddProductClick = () => {
    setProductSelectedOption("addProductComponent");
    setIsProductActive(true);
  };

  const handleImportClick = () => {
    setProductSelectedOption("ImportComponent");
    setIsProductActive(true);
  };

  const handleExportClick = () => {
    setProductSelectedOption("exportComponent");
    setIsProductActive(true);
  };

  const handleEditClick = (productId: string) => {
    setEditingProductId(productId);
    setShowProductSelectedOption(false);
    setProductSelectedOption("editComponent");
  };

  const handleCancelEditClick = () => {
    setProductSelectedOption("importComponent");
    setShowProductSelectedOption(true);
  };

  const renderContent = () => {
    switch (productSelectedOption) {
      case "addProductComponent":
        return <AddProduct />;
      case "exportComponent":
        return <p>Export layout</p>;
      case "importComponent":
        return <ProductList handleEditClick={handleEditClick} />;
      case "editComponent":
        return (
          <EditProductForm
            productId={editingProductId}
            handleCancelEditClick={handleCancelEditClick}
          />
        );
      default:
        return <p>dashboard</p>;
    }
  };

  return (
    <div>
      {isProductActive ? (
        <>
          {showProductSelectedOption && (
            <ProductHeader
              handleAddProductClick={handleAddProductClick}
              handleImportClick={handleImportClick}
              handleExportClick={handleExportClick}
            />
          )}

          <section>{renderContent()}</section>
        </>
      ) : (
        <>
          <div className="flex justify-center mt-[150px]">
            <div>
              <p className="text-sm text-gray-500 text-center mt-3">
                No Products Found!!.
              </p>
              <p className="text-sm text-gray-500 text-center mt-3">
                Ready to start selling something awesome?.
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  label="Add New Product"
                  custom="max-w-[fit-content] max-h-[fit-content] bg-red-700 hover:bg-[#9bf618] text-white"
                  onClick={handleAddProductClick}
                />

                <Button
                  label="Import Product from AliExpress"
                  custom="max-w-[fit-content] max-h-[fit-content] bg-red-700 hover:bg-[#9bf618] text-white"
                />
                <Button
                  label="Import AliExpress settings"
                  custom="max-w-[fit-content] max-h-[fit-content] bg-red-700 hover:bg-[#9bf618] text-white"
                />
                <Button
                  label="Import"
                  custom="max-w-[fit-content] max-h-[fit-content] bg-red-700 hover:bg-[#9bf618] text-white"
                  onClick={handleImportClick}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
