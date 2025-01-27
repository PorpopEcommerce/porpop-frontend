import React, { useState } from "react";
import Button from "@/app/components/product/Button";

// Define the product type
interface Product {
  id: string;
  name: string;
  image?: string; // Made optional to handle cases where `image` might be missing
}

interface AliExpressImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AliExpressImportModal: React.FC<AliExpressImportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Get backend URL from environment variable
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    console.error("Backend URL is not set in the environment variables.");
  }

  // Handle AliExpress search
  const handleSearch = async () => {
    if (!backendUrl) {
      alert("Backend URL is not configured. Please contact support.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/import/search/aliexpress`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error("Failed to search AliExpress products.");
      }

      const data = await response.json();
      console.log("Search Results:", data); // Log the response to debug issues
      setSearchResults(data);
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
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error importing products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Import from AliExpress</h2>
        <input
          type="text"
          placeholder="Search for products"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <Button
          label={loading ? "Searching..." : "Search"}
          custom={`bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSearch}
          disabled={loading}
        />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((product, index) => (
              <div key={product.id || index} className="border p-4 rounded">
                <img
                  src={
                    product?.image
                      ? "https://via.placeholder.com/150"
                      : `https://${product.image}`
                  }
                  alt={product.name || "No name available"}
                  className="w-full h-48 object-cover"
                />
                <h3 className="text-lg font-bold mt-2">
                  {product.name || "No name available"}
                </h3>
                <button
                  className="bg-green-500 text-white py-1 px-2 mt-2 rounded"
                  onClick={() => handleImport([product])}
                  disabled={loading}
                >
                  Import
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              No products found. Try a different keyword.
            </p>
          )}
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded mt-4"
          onClick={onClose}
          disabled={loading}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AliExpressImportModal;
