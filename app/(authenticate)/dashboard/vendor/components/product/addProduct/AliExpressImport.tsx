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
  
  // Base API URL - fixed the extra semicolon
  const baseApiUrl = "https://backend-porpop-1ih6.onrender.com/v1";

  // Debug on component mount
  useEffect(() => {
    console.log("All cookies:", document.cookie);
    
    // Try various storage locations
    const token = getAuthToken();
    console.log("Auth token found:", token ? "Yes" : "No");
    if (token) {
      console.log("Token first 10 chars:", token.substring(0, 10) + "...");
    }
  }, []);

  // Helper function to get cookie value
  const getCookieValue = (name: string): string => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  };

  // More comprehensive auth token retrieval
  const getAuthToken = (): string => {
    // Try multiple cookie names
    const cookieToken = getCookieValue("token") || getCookieValue("jwt") || 
                        getCookieValue("access_token") || getCookieValue("authToken") ||
                        getCookieValue("auth");
    if (cookieToken) {
      console.log("Found token in cookies");
      return cookieToken;
    }
    
    // Try localStorage as a fallback
    try {
      const localStorageToken = localStorage.getItem("token") || localStorage.getItem("jwt") || 
                               localStorage.getItem("access_token") || localStorage.getItem("authToken");
      if (localStorageToken) {
        console.log("Found token in localStorage");
        return localStorageToken;
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    }
    
    // Try sessionStorage as another fallback
    try {
      const sessionToken = sessionStorage.getItem("token") || sessionStorage.getItem("jwt") || 
                          sessionStorage.getItem("access_token") || sessionStorage.getItem("authToken");
      if (sessionToken) {
        console.log("Found token in sessionStorage");
        return sessionToken;
      }
    } catch (e) {
      console.error("Error accessing sessionStorage:", e);
    }
    
    console.warn("No auth token found in any storage location");
    return '';
  };

  // Helper function to get proxied image URL
  const getProxiedImageUrl = (url?: string): string => {
    if (!url) return '';
    return `${baseApiUrl}/imports/aliexpress/proxy-image?url=${encodeURIComponent(url)}`;
  };

  // Fetch imported products with improved error logging
  const fetchImportedProducts = async () => {
    setLoading(true);
    const token = getAuthToken();
    console.log("Token for imported products:", token ? token.substring(0, 10) + "..." : "No token found");
    
    try {
      const importUrl = `${baseApiUrl}/imports/aliexpress/imported`;
      console.log("Fetching imported products from:", importUrl);
      
      const response = await fetch(importUrl, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token.trim()}` : '',
        },
        credentials: 'include', // Include cookies in the request
      });

      console.log("Imported products response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Import products error response:", errorText);
        
        // Try to parse the error message for a better user display
        let errorMessage = `Server error (${response.status})`;
        try {
          const errorObj = JSON.parse(errorText);
          errorMessage = errorObj.message || errorMessage;
        } catch (e) {
          // If error text isn't valid JSON, use it directly
          errorMessage = errorText || errorMessage;
        }
        
        // Handle specific error cases
        if (response.status === 500 && errorMessage.includes("Invalid user ID format")) {
          console.log("There's an issue with the user ID format on the backend.");
          // Set empty results rather than showing an error
          setImportedProducts([]);
        } else {
          alert(`Error fetching imported products: ${errorMessage}`);
          setImportedProducts([]);
        }
        return;
      }

      const data = await response.json();
      console.log("Imported Products:", data);
      
      // Handle different response formats
      let products = [];
      if (data.data && Array.isArray(data.data)) {
        products = data.data;
      } else if (data.body && Array.isArray(data.body)) {
        products = data.body;
      }
      
      setImportedProducts(products);
    } catch (error: any) {
      console.error("Error message:", error.message);
      // Don't show alert for backend errors to avoid frustrating users
      console.log(`Error loading imported products: ${error.message}`);
      setImportedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle AliExpress search with enhanced error logging
  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("Please enter a search keyword");
      return;
    }

    setLoading(true);
    const token = getAuthToken();
    console.log("Search using token:", token ? token.substring(0, 10) + "..." : "No token found"); 
    
    try {
      const searchUrl = `${baseApiUrl}/imports/aliexpress/search?query=${encodeURIComponent(keyword)}`;
      console.log("Search URL:", searchUrl);
      
      const response = await fetch(searchUrl, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token.trim()}` : '',
        },
        credentials: 'include', // Include cookies in the request
      });

      console.log("Search response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Search error response:", errorText);
        throw new Error(`Failed to search AliExpress products (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log("Raw search response data:", JSON.stringify(data, null, 2));
      
      // Extract products from the correct path in the response
      let products = [];
      if (data.body && Array.isArray(data.body)) {
        // If products are in data.body
        products = data.body;
      } else if (data.data && Array.isArray(data.data)) {
        // If products are in data.data (original expected format)
        products = data.data;
      } else if (data.data && data.data.body && Array.isArray(data.data.body)) {
        // If products are nested in data.data.body
        products = data.data.body;
      }
      
      console.log("Products to display:", products.length);
      setSearchResults(products);
      setIsSearchModalOpen(true);
      
      if (products.length === 0) {
        console.log("No products found in the search results. Try a different keyword.");
      }
    } catch (error : any) {
      console.error("Search error details:", error);
      alert(`Error searching products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle importing selected product with improved error logging
  const handleImport = async (product: Product) => {
    setImportLoading(true);
    const token = getAuthToken();
    console.log("Import using token:", token ? token.substring(0, 10) + "..." : "No token found");
    
    try {
      const importUrl = `${baseApiUrl}/imports/aliexpress/import?id=${encodeURIComponent(product.productId)}`;
      console.log("Import URL:", importUrl);
      
      const response = await fetch(importUrl, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token.trim()}` : '',
        },
        credentials: 'include', // Include cookies in the request
      });

      console.log("Import response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Import error response:", errorText);
        throw new Error(`Failed to import product details (${response.status}): ${errorText}`);
      }

      const importedData = await response.json();
      console.log("Imported Product Data:", importedData);

      // Now save the imported product
      const saveUrl = `${baseApiUrl}/imports/aliexpress/save`;
      console.log("Save URL:", saveUrl);
      
      const saveResponse = await fetch(saveUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token.trim()}` : '',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify(importedData.data),
      });

      console.log("Save response status:", saveResponse.status);
      
      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        console.error("Save error response:", errorText);
        throw new Error(`Failed to save imported product (${saveResponse.status}): ${errorText}`);
      }

      alert("Product imported successfully!");
      // Refresh the imported products list
      fetchImportedProducts();
    } catch (error : any) {
      console.error("Import/save error details:", error);
      alert(`Error importing product: ${error.message}`);
    } finally {
      setImportLoading(false);
    }
  };

  // Handle updating an imported product with improved error logging
  const handleUpdate = async (updatedProduct: Product) => {
    if (!editingProduct || !editingProduct.id) {
      alert("No product selected for update");
      return;
    }

    setLoading(true);
    const token = getAuthToken();
    console.log("Update using token:", token ? token.substring(0, 10) + "..." : "No token found");
    
    try {
      const updateUrl = `${baseApiUrl}/imports/aliexpress/${editingProduct.id}`;
      console.log("Update URL:", updateUrl);
      console.log("Update payload:", JSON.stringify(updatedProduct, null, 2));
      
      const response = await fetch(updateUrl, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token.trim()}` : '',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify(updatedProduct),
      });

      console.log("Update response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update error response:", errorText);
        throw new Error(`Failed to update product (${response.status}): ${errorText}`);
      }

      alert("Product updated successfully!");
      setEditingProduct(null);
      fetchImportedProducts();
    } catch (error : any) {
      console.error("Update error details:", error);
      alert(`Error updating product: ${error.message}`);
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
                      <div className="w-full h-48 flex items-center justify-center bg-gray-800">
                        <img
                          src={getProxiedImageUrl(product.imgUrl || product.imageURL)}
                          alt={product.displayTitle || product.name || "Product"}
                          className="max-w-full max-h-48 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.log("Proxy image failed to load:", target.src);
                            
                            // Show a colored div as fallback
                            const parent = target.parentElement;
                            if (parent) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'w-full h-full flex items-center justify-center bg-gray-700 text-white text-center p-2';
                              placeholder.textContent = 'Product Image';
                              parent.replaceChild(placeholder, target);
                            }
                          }}
                        />
                      </div>
                    )}
                    <div className="p-3 text-center">
                      <span className="text-center">
                        {truncateText(product.displayTitle || product.name || "")}
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
                      <div className="w-full h-48 flex items-center justify-center bg-gray-800">
                        <img
                          src={getProxiedImageUrl(product.imgUrl || product.imageURL)}
                          alt={product.displayTitle || product.name || "Product"}
                          className="max-w-full max-h-48 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.log("Proxy image failed to load:", target.src);
                            
                            // Show a colored div as fallback
                            const parent = target.parentElement;
                            if (parent) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'w-full h-full flex items-center justify-center bg-gray-700 text-white text-center p-2';
                              placeholder.textContent = 'Product Image';
                              parent.replaceChild(placeholder, target);
                            }
                          }}
                        />
                      </div>
                    )}
                    <div className="p-3 text-left w-full">
                      <h4 className="font-bold">
                        {truncateText(product.displayTitle || product.name || "")}
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