"use client";

import { useEffect } from "react";
// import { products } from "../utils/Products";
import ProductCard from "../components/product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/features/products/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import Spinner from "../components/Spinner";
import PriceFilter from "../components/product/PriceFilter";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {filteredProducts, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="w-full p-6 flex">
      <PriceFilter />
      <div className="flex-1">

      </div>
      <div className="w-full p-6 max-w-[100rem] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product: any) => {
          return <ProductCard key={product.ProductID} data={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
