"use client";

import { useEffect, useState } from "react";
import { categories } from "../utils/category";
import ProductCard from "../components/product/ProductCard";
import { formatPrice } from "../utils/formatter";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/features/products/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import Spinner from "../components/Spinner";

const ProductList = () => {
  const [priceAmount, setPriceAmount] = useState(1250);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(33); // Start with 1/3 of 100
  const dispatch = useDispatch<AppDispatch>();
  const { allProducts, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const productBelowPrice = allProducts.filter(
    (product) => product.Price <= priceAmount
  );

  const filteredProducts = selectedCategory
    ? allProducts.filter(
        (product: any) => product.category === selectedCategory
      )
    : allProducts;

  // Get the first 100 products if category has more than 100
  const displayedProducts = filteredProducts.slice(0, 100);

  // Get only the first `visibleCount` products
  const productsToShow = displayedProducts.slice(0, visibleCount);

  // Handle "Load More" functionality
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 33, displayedProducts.length));
  };

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="w-full max-w-[100rem] mx-auto p-12">
      {/* <PriceFilter /> */}
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <p className="text-xl font-semibold">Exclusive offers</p>
          <p className="text-xl text-green-700 font-semibold">
            Products under {formatPrice(priceAmount)}
          </p>
        </div>
        <div>
          <p>See All</p>
        </div>
      </div>
      {productBelowPrice.length > 0 ? (
        <div className="py-6 grid lg:grid-cols-5 gap-8">
          {productBelowPrice.map((product: any) => {
            return <ProductCard key={product.id} data={product} />;
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-[400px]">
          <p>No Product Available</p>
        </div>
      )}
      <div className="flex gap-3 items-center- w-full overflow-auto scroll-smooth py-5 scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-[#a4cd3a] hover:scrollbar-track-gray-100">
        <div
          onClick={() => setSelectedCategory(null)}
          className={`cursor-pointer whitespace-nowrap ${
            selectedCategory === null ? "underline" : "hover:underline"
          }`}
        >
          <p>All</p>
        </div>

        <div className="">
          <ul className="flex gap-3">
            {categories.map((category: any) => {
              return (
                <li
                  key={category.id}
                  className={`cursor-pointer whitespace-nowrap ${
                    selectedCategory === category.name
                      ? "underline"
                      : "hover:underline"
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      category.name === selectedCategory ? null : category.name
                    )
                  }
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="py-6">
        {productsToShow.length > 0 ? (
          <div className="grid lg:grid-cols-5 gap-8">
            {productsToShow.map((product: any) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center h-[400px] items-center">
            <p>No Product for this category</p>
          </div>
        )}
      </div>
      {visibleCount < displayedProducts.length && (
        <div className="w-full flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800"
          >
            Load More
          </button>
        </div>
      )}

      {visibleCount >= displayedProducts.length &&
        displayedProducts.length > 0 && (
          <div className="w-full flex justify-center mt-4 text-gray-500">
            <p>No more products to show</p>
          </div>
        )}
    </div>
  );
};

export default ProductList;
