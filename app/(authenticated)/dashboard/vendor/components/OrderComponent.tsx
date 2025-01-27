import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const OrderComponent = () => {
  return (
    <div>
      <div className="mb-4">
        <ul className="flex gap-2 items-center text-sm text-[#84788c]">
          <li className="cursor-pointer">All ()</li>
          <li>Pending payment ()</li>
          <li>Processing ()</li>
          <li>On hold ()</li>
          <li>Completed ()</li>
          <li>Cancelled ()</li>
          <li>Refunded ()</li>
          <li>Failed ()</li>
        </ul>
      </div>
      <div className="bg-red-500 w-full p-5 text-white flex items-center gap-2">
        <AiOutlineExclamationCircle />
        No orders found
      </div>
    </div>
  );
};

export default OrderComponent;
