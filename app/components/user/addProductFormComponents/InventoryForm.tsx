import { useState, useEffect } from "react";

interface InventoryFormProps {
  SKU?: string;
  stockType: string;
  allowType: boolean;
  isStockManagementEnabled: boolean;
  onSKUChange: (value: string) => void;
  onStockTypeChange: (type: string) => void;
  onAllowTypeChange: (type: boolean) => void;
  onStockManagementToggle: () => void;
  stockQuantity?: number;
  lowStockThreshold?: number;
  onStockQuantityChange: (value: number) => void;
  onLowStockThresholdChange: (value: number) => void;
  existingSKUs?: string[]; // Pass existing SKUs for validation
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  SKU,
  stockType,
  allowType,
  isStockManagementEnabled,
  onSKUChange,
  onStockTypeChange,
  onAllowTypeChange,
  onStockManagementToggle,
  stockQuantity = 0,
  lowStockThreshold = 0,
  onStockQuantityChange,
  onLowStockThresholdChange,
  existingSKUs = []
}) => {
  const [stockTypeDropdown, setStockTypeDropdown] = useState(false);
  const [generatedSKU, setGeneratedSKU] = useState("");

  // Generate a unique SKU on initial load or if existing SKUs change
  useEffect(() => {
    const generateUniqueSKU = () => {
      let newSKU;
      do {
        newSKU = `PROD-${Math.floor(1000 + Math.random() * 9000)}`; // Example format
      } while (existingSKUs.includes(newSKU));
      return newSKU;
    };

    const initialSKU = SKU || generateUniqueSKU();
    setGeneratedSKU(initialSKU);
    onSKUChange(initialSKU); // Notify parent about initial SKU
  }, [SKU, existingSKUs, onSKUChange]);

  const handleSKUChange = (value: string) => {
    setGeneratedSKU(value);
    onSKUChange(value);
  };

  const handleStockTypeSelect = (type: string) => {
    onStockTypeChange(type);
    setStockTypeDropdown(false);
  };

  return (
    <div className="mb-3 border">
      <div className="p-3 border-b">
        <p className="block text-[14px] font-bold text-gray-700">
          Inventory{" "}
          <span className="text-[10px] font-light italic">
            Manage inventory for this product
          </span>
        </p>
      </div>

      <div className="p-3 grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-gray-700 mb-2">
            SKU <span>(Stock Keeping Unit)</span>
          </label>
          <input
            type="text"
            readOnly
            value={SKU}
            onChange={(e) => onSKUChange(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {!isStockManagementEnabled && (
          <div className="relative">
            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Stock Status
            </label>
            <input
              type="text"
              placeholder={stockType}
              value={stockType}
              readOnly
              onClick={() => setStockTypeDropdown((prev) => !prev)}
              className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
            />
            {stockTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {["In Stock", "Out of Stock", "On Backorder"].map((type) => (
                  <div
                    key={type}
                    onClick={() => handleStockTypeSelect(type)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center p-3 gap-3">
        <input
          type="checkbox"
          checked={isStockManagementEnabled}
          onChange={onStockManagementToggle}
        />
        <label className="text-[12px] font-medium text-gray-700">
          Enable Product Stock Management
        </label>
      </div>

      {isStockManagementEnabled && (
        <div className="p-3 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              min="0"
              value={stockQuantity}
              onChange={(e) => onStockQuantityChange(Number(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Low Stock Threshold
            </label>
            <input
              type="number"
              min="0"
              value={lowStockThreshold}
              onChange={(e) => onLowStockThresholdChange(Number(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>
      )}

      <div className="flex items-center p-3 gap-3">
        <input
          type="checkbox"
          checked={allowType}
          onChange={(e) => onAllowTypeChange(e.target.checked)}
        />
        <label className="text-[12px] font-medium text-gray-700">
          Allow only one quantity of this product to be bought in a single order
        </label>
      </div>
    </div>
  );
};

export default InventoryForm;
