import { useState, useEffect, useMemo } from "react";

interface SubCategory {
  subtitle: string;
  subcategory: string[];
}

interface Category {
  id: number;
  title: string;
  href: string;
  category: SubCategory[];
}

interface CategoryFormProps {
  onUpdateCategories: (categories: { id: number; value: string }[]) => void;
  categories: { id: number; value: string }[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  onUpdateCategories,
  categories: propsCategories,
}) => {
  const [categories, setCategories] = useState<{ id: number; value: string }[]>(
    propsCategories || [{ id: Date.now(), value: "" }]
  );

  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  // Fetch category options on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/category.json");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategoryOptions(data.productData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Sync categories with props
  useEffect(() => {
    setCategories(propsCategories);
  }, [propsCategories]);

  // Update parent with current category data (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      onUpdateCategories(categories);
    }, 300); // Debounce to avoid frequent updates

    return () => clearTimeout(timeout); // Cleanup on component unmount or before re-triggering
  }, [categories, onUpdateCategories]);

  const addCategory = () => {
    setCategories([...categories, { id: Date.now(), value: "" }]);
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleCategorySelect = (inputId: number, fullPath: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === inputId && category.value !== fullPath
          ? { ...category, value: fullPath }
          : category
      )
    );
    setShowDropdown(null);
    setActiveCategory(null);
    setActiveSubtitle(null);
  };

  // Memoized lookups for active category and subtitle
  const activeCategoryData = useMemo(
    () => categoryOptions.find((parent) => parent.title === activeCategory),
    [categoryOptions, activeCategory]
  );

  const activeSubtitleData = useMemo(
    () => activeCategoryData?.category.find((sub) => sub.subtitle === activeSubtitle),
    [activeCategoryData, activeSubtitle]
  );

  return (
    <div className="mb-3">
      <label className="block text-[12px] font-bold text-gray-700 mb-2">
        Category
      </label>
      {categories.map((category) => (
        <div key={category.id} className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Category"
              value={category.value}
              readOnly
              onClick={() =>
                setShowDropdown(showDropdown === category.id ? null : category.id)
              }
              className="my-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none cursor-pointer"
            />
            {showDropdown === category.id && (
              <div className="absolute top-full mt-1 w-full border rounded-md shadow-lg bg-white z-10">
                <div className="flex">
                  <div className="flex-1 p-3 border-r">
                    {categoryOptions.map((parentCategory) => (
                      <p
                        key={parentCategory.id}
                        className={`p-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                          activeCategory === parentCategory.title ? "bg-gray-200" : ""
                        }`}
                        onClick={() => {
                          setActiveCategory(parentCategory.title);
                          setActiveSubtitle(null);
                        }}
                      >
                        {parentCategory.title}
                      </p>
                    ))}
                  </div>
                  {activeCategory && (
                    <div className="flex-1 p-3 border-r">
                      {activeCategoryData?.category.map((sub) => (
                        <p
                          key={sub.subtitle}
                          className={`p-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                            activeSubtitle === sub.subtitle ? "bg-gray-200" : ""
                          }`}
                          onClick={() => setActiveSubtitle(sub.subtitle)}
                        >
                          {sub.subtitle}
                        </p>
                      ))}
                    </div>
                  )}
                  {activeSubtitle && (
                    <div className="flex-1 p-3">
                      {activeSubtitleData?.subcategory.map((subCat) => (
                        <p
                          key={subCat}
                          className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                          onClick={() =>
                            handleCategorySelect(
                              category.id,
                              `${activeCategory} > ${activeSubtitle} > ${subCat}`
                            )
                          }
                        >
                          {subCat}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => deleteCategory(category.id)}
            className="text-red-400 text-[10px] ml-2"
          >
            Delete
          </button>
        </div>
      ))}
      <span
        onClick={addCategory}
        className="block text-[10px] font-medium text-gray-700 mb-2 cursor-pointer"
      >
        + Add new category
      </span>
    </div>
  );
};

export default CategoryForm;
