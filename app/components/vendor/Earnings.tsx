import React from "react";

const Horizontal = () => {
  return <hr className="w-[100%] my-2" />;
};

const Earnings = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-4 mb-4">
      <div className="rounded-md px-3 py-5 bg-[#1f2937]">
        <span className="text-[12px]">Net Sales</span>
        <p>US$0.00</p>
      </div>
      <div className="rounded-md px-3 py-5 bg-[#1f2937]">
        <span className="text-[12px]">Earnings</span>
        <p>US$0.00</p>
      </div>
      <div className="rounded-md px-3 py-5 bg-[#1f2937]">
        <span className="text-[12px]">Orders</span>
        <p>0</p>
      </div>
    </div>
  );
};

export default Earnings;
