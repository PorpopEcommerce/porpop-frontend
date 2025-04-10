import React, { useState } from "react";
import { categories } from "@/app/utils/category";


interface CategoryProps {
  selectedCategory?: string;
  onCategorySelect: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ selectedCategory, onCategorySelect }) => {
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const handleCategorySelect = (category: string) => {
    onCategorySelect(category);
    setCategoryDropdown(false);
  };

  

  return (
    <div className="mb-3 border">
      <div className="p-3 border-b">
        <p className="block text-[14px] font-bold text-white">
          Category
          <span className="text-[10px] font-light italic">Select a category for the product</span>
        </p>
      </div>

      <div className="p-3 relative">
        <label className="block text-[12px] font-medium text-white mb-2">
          Product Category
        </label>
        <input
          type="text"
          placeholder={selectedCategory || "Select a category"}
          value={selectedCategory || ""}
          readOnly
          onClick={() => setCategoryDropdown((prev) => !prev)}
          className="mt-1 block w-full p-2 border text-white bg-[#111827] border-gray-300 rounded-md focus:outline-none cursor-pointer"
        />
        {categoryDropdown && (
          <div className="absolute top-full left-0 mt-1 w-full h-[300px] bg-[#111827] border border-gray-300 rounded-md shadow-lg z-10">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category.name)}
                className="p-2 hover:bg-[#1f2937] cursor-pointer"
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
