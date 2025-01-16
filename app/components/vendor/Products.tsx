import React from "react";

const productData = [
  { label: "Total", value: "0" },
  { label: "Live", value: "0" },
  { label: "Offline", value: "0" },
  { label: "Pending Review", value: "0" },
];

const Products = () => {
  return (
    <div className="border w-full p-3 mb-4">
      <div className="border-b w-full flex justify-between items-center p-2">
        <h2>PRODUCTS</h2>
      </div>
      <ul className="p-3 space-y-2">
        {productData.map((order) => {
          return (
            <li key={order.label} className="flex justify-between items-center">
              <span className="text-sm text-[#84788c]">{order.label}</span>
              <span className="text-sm text-[#84788c]">{order.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
