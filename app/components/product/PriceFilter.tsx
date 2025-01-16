"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { filterByPrice } from "@/app/redux/features/products/productSlice";

const PriceFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleFilter = () => {
    dispatch(filterByPrice({ min: minPrice, max: maxPrice }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Filter by Price
      </h3>
      <div className="flex items-end gap-2">
        {/* Min Price Input */}
        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-600"
          >
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            min={0}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-800"
            placeholder="Enter minimum price"
          />
        </div>

        {/* Max Price Input */}
        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-600"
          >
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-800"
            placeholder="Enter maximum price"
          />
        </div>
        {/* Apply Filter Button */}
        <button
          onClick={handleFilter}
          className=" w-fit bg-blue-500 text-white p-2 rounded-md font-medium hover:bg-blue-600 transition duration-300"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
