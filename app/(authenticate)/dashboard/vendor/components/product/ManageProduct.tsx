"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import AddProduct from "./addProduct/AddProduct";
import { useAuth } from "@/app/context/AuthContext";
import ProductHeader from "./ProductHeader";
import ProductList from "./productReview/ProductList";
import EditProductForm from "./editProduct/EditProductForm";
import Button from "@/app/components/product/Button";
import AliExpressImport from "./addProduct/AliExpressImport";

const Product = () => {
  const [productSelectedOption, setProductSelectedOption] = useState<
    | "importComponent"
    | "importAliComponent"
    | "addProductComponent"
    | "exportComponent"
    | "editComponent"
    | "renderComponent"
  >("renderComponent");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const handleAddProductClick = () =>
    setProductSelectedOption("addProductComponent");
  const handleImportClick = () => setProductSelectedOption("importComponent");
  const handleExportClick = () => setProductSelectedOption("exportComponent");
  const handleViewProductClick = () =>
    setProductSelectedOption("renderComponent");
  const handleImportAliProduct = () =>
    setProductSelectedOption("importAliComponent");

  const handleEditClick = (productId: string) => {
    setEditingProductId(productId);
    setProductSelectedOption("editComponent");
  };

  console.log(editingProductId);

  const handleCancelEditClick = () =>
    setProductSelectedOption("importComponent");

  const renderContent = () => {
    switch (productSelectedOption) {
      case "addProductComponent":
        return <AddProduct />;
      case "exportComponent":
        return <p>Export layout</p>;
      case "importAliComponent":
        return <AliExpressImport />;
      case "editComponent":
        return (
          <EditProductForm
            productId={editingProductId}
            handleCancelEditClick={handleCancelEditClick}
          />
        );
      case "renderComponent":
        return (
          <>
            <ProductList
              handleEditClick={handleEditClick}
              handleViewProductClick={handleViewProductClick}
              handleImportAliProduct={handleImportAliProduct}
              handleAddProductClick={handleAddProductClick}
            />
          </>
        );

      default:
        return (
          <>
            <ProductList
              handleEditClick={handleEditClick}
              handleViewProductClick={handleViewProductClick}
              handleImportAliProduct={handleImportAliProduct}
              handleAddProductClick={handleAddProductClick}
            />
          </>
        );
    }
  };

  return (
    <div>
      <section>{renderContent()}</section>
    </div>
  );
};

export default Product;
