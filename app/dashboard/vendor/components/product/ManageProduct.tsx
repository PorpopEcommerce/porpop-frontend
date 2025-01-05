"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchProductByVendorId } from "@/app/redux/features/products/productSlice";
import AddProduct from "./addProduct/AddProduct";
import { useAuth } from "@/app/context/AuthContext";
import ProductHeader from "./ProductHeader";
import ProductList from "./productReview/ProductList";
import EditProductForm from "./editProduct/EditProductForm";
import Button from "@/app/components/product/Button";

const Product = () => {
  const [productSelectedOption, setProductSelectedOption] = useState<
    | "importComponent"
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

  const handleEditClick = (productId: string) => {
    setEditingProductId(productId);
    setProductSelectedOption("editComponent");
  };

  const handleCancelEditClick = () =>
    setProductSelectedOption("importComponent");

  const renderContent = () => {
    switch (productSelectedOption) {
      case "addProductComponent":
        return <AddProduct />;
      case "exportComponent":
        return <p>Export layout</p>;
      case "importComponent":
        return <p>Import layout</p>;
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
            <ProductList handleEditClick={handleEditClick} />
          </>
        );

      default:
        return (
          <>
            <ProductList handleEditClick={handleEditClick} />
          </>
        );
    }
  };

  return (
    <div>
      <ProductHeader
        handleAddProductClick={handleAddProductClick}
        handleImportClick={handleImportClick}
        handleExportClick={handleExportClick}
      />

      <section>{renderContent()}</section>
    </div>
  );
};

export default Product;
