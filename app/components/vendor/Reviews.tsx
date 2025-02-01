import React from "react";

const reviewData = [
  { label: "All", value: "0" },
  { label: "Pending", value: "0" },
  { label: "Spam", value: "0" },
  { label: "Trash", value: "0" },
];

const Reviews = () => {
  return (
    <div className="w-full p-3 mb-4 bg-[#1f2937]">
      <div className="border-b w-full p-2">
        <h2>REVIEWS</h2>
      </div>
      <ul className="p-3 space-y-2">
        {reviewData.map((order) => {
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

export default Reviews;
