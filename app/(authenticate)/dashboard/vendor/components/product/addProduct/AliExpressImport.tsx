import React, { useState } from "react";
import Button from "@/app/components/product/Button";
import { truncateText } from "@/app/utils/truncateText";

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-[#1f2937] p-6 rounded shadow-lg w-[80%] max-w-[60rem] h-[100%] max-h-[30rem]">
        <Button
          onClick={onClose}
          label="CLOSE"
          custom="absolute max-w-fit top-2 right-2 bg-red-700"
        />
        <div className="h-full p-4 overflow-y-auto">{children}</div>{" "}
      </div>
    </div>
  );
};

// Define the product type
interface Product {
  productId: string;
  displayTitle: string;
  imgUrl?: string; // Made optional to handle cases where `image` might be missing
}

interface AliExpressProps {
  handleViewProductClick: () => void;
}

const AliExpressImport: React.FC<AliExpressProps> = ({
  handleViewProductClick,
}) => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Get backend URL from environment variable
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Handle AliExpress search
  const handleSearch = async () => {
    // Open the modal when search results are received

    setLoading(true);
    try {
      const response = await fetch(
        `https://backend-porpop.onrender.com/api/v1/import/search/aliexpress`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword: keyword }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search AliExpress products.");
      }

      const data = await response.json();
      console.log("Search Results:", data);
      setSearchResults(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Error searching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle importing selected products
  const handleImport = async (selectedProducts: Product[]) => {
    if (!backendUrl) {
      alert("Backend URL is not configured. Please contact support.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/v1/import/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_name: "AliExpress",
          products: selectedProducts,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error("Failed to import products.");
      }

      alert("Products imported successfully!");
    } catch (error) {
      console.error(error);
      alert("Error importing products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative py-20 flex items-center justify-center">
      <button
        className="absolute top-0 right-0"
        onClick={handleViewProductClick}
      >
        Go back
      </button>
      <div className="bg-[#1f2937] p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Import from AliExpress</h2>
        <input
          type="text"
          placeholder="Search for products"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 w-full mb-4 focus:outline-none text-white bg-[#111827]"
        />
        <Button
          label={loading ? "Searching..." : "Search"}
          custom={`bg-blue-500 text-white py-2 px-4 rounded mb-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSearch}
          disabled={loading}
        />
        <p className="text-gray-500 text-center col-span-3">
          No products found? Try a different keyword.
        </p>{" "}
        {/* Modal for showing search results */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-bold mb-4">Select Products</h3>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {searchResults.map((product) => (
                <div
                  key={product.productId}
                  className="flex flex-col items-center justify-between bg-[#111827] mb-4 shadow-lg"
                >
                  <div className="flex flex-col gap-3 items-center">
                    {product.imgUrl && (
                      <img
                        src={product.imgUrl}
                        alt={product.displayTitle}
                        className="w-full"
                      />
                    )}
                    <div className="p-2 text-center">
                      <span className="text-center">
                        {truncateText(product.displayTitle)}
                      </span>
                    </div>
                  </div>
                  <Button
                    label="Select"
                    custom="bg-green-500 text-white py-1 px-2 rounded max-w-fit my-3"
                    onClick={() => handleImport([product])}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full h-full justify-center items-center">
              <p className="text-gray-500">No products found.</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AliExpressImport;
