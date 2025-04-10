import React from "react";

const orderData = [
  { label: "Total", value: "0", color: "#84788c" },
  { label: "Completed", value: "0", color: "#7db388" },
  { label: "Pending", value: "0", color: "#adbcd3" },
  { label: "Processing", value: "0", color: "#4781b0" },
  { label: "Cancelled", value: "0", color: "#d87379" },
  { label: "Refunded", value: "0", color: "#e8dd6c" },
  { label: "On hold", value: "0", color: "#f1b75f" },
];

const Orders = () => {
  return (
    <div className="w-full p-3 mb-4 bg-[#1f2937]">
      <div className="border-b w-full p-2">
        <h2>ORDERS</h2>
      </div>
      <ul className="p-3 space-y-2">
        {orderData.map((order) => {
          return (
            <li
              key={order.label}
              className={`flex justify-between items-center`}
            >
              <span className="text-sm" style={{ color: order.color }}>{order.label}</span>
              <span className="text-sm" style={{ color: order.color }}>{order.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Orders;
