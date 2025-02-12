"use client";

import { useEffect } from "react";
import { products } from "../utils/Products";
import ProductCard from "../components/product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/features/products/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import Spinner from "../components/Spinner";
import PriceFilter from "../components/product/PriceFilter";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {allProducts, filteredProducts, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : allProducts;

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="w-full max-w-[100rem] mx-auto p-6 flex">
      <PriceFilter />
      <div className="flex-1 p-6 grid lg:grid-cols-2 gap-8">
        {productsToDisplay.map((product: any) => {
          return <ProductCard key={product.ProductID} data={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
