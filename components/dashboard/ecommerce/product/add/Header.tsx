"use client";

import { HiPlus, HiX } from "react-icons/hi";
import Routes from "@/components/dashboard/Routes";
import Button from "@/components/Button";

export default function Header() {
  const tabs = ["All Products", "Published", "Low Stock", "Draft"];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="space-y-2">
          <h4 className="text-white text-2xl font-bold">Add Product</h4>

          <Routes routes={["Product List", "Add Product"]} />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="dark" icon={<HiX />}>
            Cancel
          </Button>
          <Button variant="green" icon={<HiPlus />}>
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
