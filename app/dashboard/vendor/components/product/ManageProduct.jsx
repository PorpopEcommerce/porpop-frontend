'use client'

import { useState } from "react";
import AddProduct from "./addProduct/AddProduct";
import ProductHeader from "./ProductHeader";
import ProductList from "./productReview/ProductList";

const Product = () => {
    const [productSelectedOption, setProductSelectedOption] = useState("ImportComponent");

    const handleAddProductClick = () => {
        setProductSelectedOption("addProductComponent");
    };

    const handleImportClick = () => {
        setProductSelectedOption("ImportComponent");
    };

    const handleExportClick = () => {
        setProductSelectedOption("exportComponent");
    };

    const renderContent = () => {
        switch (productSelectedOption) {
            case "addProductComponent":
                return <AddProduct />;
            case "exportComponent":
                return <p>Export layout</p>;
            case "ImportComponent":
                return <ProductList />
            default:
                return <p>dashboard</p>;
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
