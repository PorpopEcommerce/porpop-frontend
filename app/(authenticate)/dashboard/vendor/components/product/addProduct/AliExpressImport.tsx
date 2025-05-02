import React, { useState, useEffect } from "react";
import Button from "@/app/components/product/Button";
import { truncateText } from "@/app/utils/truncateText";
import { Modal } from "@/app/components/Modal";

// Define the product type based on your backend response
interface Product {
  id?: string; // For imported products
  productId: string;
  displayTitle: string;
  name?: string;
  description?: string;
  price?: number;
  imgUrl?: string;
  imageURL?: string;
  productImages?: string[];
  productStatus?: string;
  isImported?: boolean;
}

interface AliExpressProps {
  handleViewProductClick: () => void;
}

const AliExpressImport: React.FC<AliExpressProps> = ({
  handleViewProductClick,
}) => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [importedProducts, setImportedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isImportedModalOpen, setIsImportedModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Base API URL
  const baseApiUrl = "https://backend-porpop-1ih6.onrender.com/v1";;

  // Fetch imported products
  const fetchImportedProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseApiUrl}/imports/aliexpress/imported`,
        {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch imported products.");
      }

      const data = await response.json();
      console.log("Imported Products:", data);
      setImportedProducts(data.data || []);
    } catch (error) {
      console.error(error);
      alert("Error fetching imported products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle AliExpress search
  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("Please enter a search keyword");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${baseApiUrl}/imports/aliexpress/search?query=${encodeURIComponent(keyword)}`,
        {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search AliExpress products.");
      }

      const data = await response.json();
      console.log("Search Results:", data);
      setSearchResults(data.data || []);
      setIsSearchModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Error searching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle importing selected product
  const handleImport = async (product: Product) => {
    setImportLoading(true);
    try {
      const response = await fetch(
        `${baseApiUrl}/imports/aliexpress/import?id=${encodeURIComponent(product.productId)}`,
        {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to import product details.");
      }

      const importedData = await response.json();
      console.log("Imported Product Data:", importedData);

      // Now save the imported product
      const saveResponse = await fetch(
        `${baseApiUrl}/imports/aliexpress/save`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(importedData.data),
        }
      );

      if (!saveResponse.ok) {
        throw new Error("Failed to save imported product.");
      }

      alert("Product imported successfully!");
      // Refresh the imported products list
      fetchImportedProducts();
    } catch (error) {
      console.error(error);
      alert("Error importing product. Please try again.");
    } finally {
      setImportLoading(false);
    }
  };

  // Handle updating an imported product
  const handleUpdate = async (updatedProduct: Product) => {
    if (!editingProduct || !editingProduct.id) {
      alert("No product selected for update");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${baseApiUrl}/imports/aliexpress/${editingProduct.id}`,
        {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      alert("Product updated successfully!");
      setEditingProduct(null);
      fetchImportedProducts();
    } catch (error) {
      console.error(error);
      alert("Error updating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal for a product
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <div className="relative py-20 flex items-center justify-center">
      <button
        className="absolute top-0 right-0"
        onClick={handleViewProductClick}
      >
        Go back
      </button>
      <div className="bg-[#1f2937] p-6 rounded shadow-lg w-3/4">
        <h2 className="text-xl font-bold mb-4">Import from AliExpress</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search for products"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border p-2 w-full mb-2 focus:outline-none text-white bg-[#111827]"
            />
            <Button
              label={loading ? "Searching..." : "Search Products"}
              custom={`bg-blue-500 text-white py-2 px-4 rounded w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSearch}
              disabled={loading}
            />
          </div>
          
          <div className="flex-1">
            <Button
              label="View Imported Products"
              custom="bg-green-500 text-white py-2 px-4 rounded w-full"
              onClick={() => {
                fetchImportedProducts();
                setIsImportedModalOpen(true);
              }}
            />
          </div>
        </div>
        
        <p className="text-gray-500 text-center">
          Search for products on AliExpress or manage your imported products.
        </p>

        {/* Modal for showing search results */}
        <Modal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}>
          <h3 className="text-lg font-bold mb-4">AliExpress Search Results</h3>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
              {searchResults.map((product) => (
                <div
                  key={product.productId}
                  className="flex flex-col items-center justify-between bg-[#111827] shadow-lg rounded overflow-hidden"
                >
                  <div className="flex flex-col gap-3 items-center w-full">
                    {(product.imgUrl || product.imageURL) && (
                      <img
                        src={product.imgUrl || product.imageURL}
                        alt={product.displayTitle || product.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-3 text-center">
                      <span className="text-center">
                        {truncateText(product.displayTitle || product.name || "",)}
                      </span>
                    </div>
                  </div>
                  <Button
                    label={importLoading ? "Importing..." : "Import Product"}
                    custom={`bg-green-500 text-white py-2 px-4 rounded w-full my-3 ${
                      importLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleImport(product)}
                    disabled={importLoading}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full h-full justify-center items-center p-10">
              <p className="text-gray-500">No products found. Try different keywords.</p>
            </div>
          )}
        </Modal>

        {/* Modal for showing imported products */}
        <Modal isOpen={isImportedModalOpen} onClose={() => setIsImportedModalOpen(false)}>
          <h3 className="text-lg font-bold mb-4">Your Imported Products</h3>
          {importedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
              {importedProducts.map((product) => (
                <div
                  key={product.id || product.productId}
                  className="flex flex-col items-center justify-between bg-[#111827] shadow-lg rounded overflow-hidden"
                >
                  <div className="flex flex-col gap-3 items-center w-full">
                    {(product.imgUrl || product.imageURL) && (
                      <img
                        src={product.imgUrl || product.imageURL}
                        alt={product.displayTitle || product.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-3 text-left w-full">
                      <h4 className="font-bold">
                        {truncateText(product.displayTitle || product.name || "",)}
                      </h4>
                      {product.price && (
                        <p className="text-green-400 my-1">Price: ${product.price.toFixed(2)}</p>
                      )}
                      {product.productStatus && (
                        <p className="text-gray-400 my-1">Status: {product.productStatus}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    label="Edit Product"
                    custom="bg-yellow-500 text-white py-2 px-4 rounded w-full my-3"
                    onClick={() => openEditModal(product)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full h-full justify-center items-center p-10">
              <p className="text-gray-500">No imported products found. Import some products first.</p>
            </div>
          )}
        </Modal>

        {/* Edit product modal */}
        {editingProduct && (
          <Modal isOpen={!!editingProduct} onClose={() => setEditingProduct(null)}>
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name || editingProduct.displayTitle || ""}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    name: e.target.value
                  })}
                  className="border p-2 w-full focus:outline-none text-white bg-[#111827]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    description: e.target.value
                  })}
                  className="border p-2 w-full h-24 focus:outline-none text-white bg-[#111827]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={editingProduct.price || 0}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    price: parseFloat(e.target.value)
                  })}
                  className="border p-2 w-full focus:outline-none text-white bg-[#111827]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editingProduct.productStatus || ""}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    productStatus: e.target.value
                  })}
                  className="border p-2 w-full focus:outline-none text-white bg-[#111827]"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  label="Cancel"
                  custom="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setEditingProduct(null)}
                />
                <Button
                  label={loading ? "Saving..." : "Save Changes"}
                  custom={`bg-green-500 text-white py-2 px-4 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleUpdate(editingProduct)}
                  disabled={loading}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AliExpressImport;