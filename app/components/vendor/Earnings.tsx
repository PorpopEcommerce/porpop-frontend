import React from "react";

const Horizontal = () => {
  return <hr className="w-[100%] my-2" />;
};

const Earnings = () => {
  return (
    <div className="w-full border p-3 mb-4">
      <ul className="w-full">
        <li className="p-4 w-full flex flex-col space-y-2 justify-center items-center text-gray-500">
          <h3>Net Sales</h3>
          <p>US$0.00</p>
        </li>

        <Horizontal />

        <li className="p-4 w-full flex flex-col space-y-2 justify-center items-center text-gray-500">
          <h3>Earnings</h3>
          <p>US$0.00</p>
        </li>

        <Horizontal />

        <li className="p-4 w-full flex flex-col space-y-2 justify-center items-center text-gray-500">
          <h3>Orders</h3>
          <p>0</p>
        </li>
      </ul>
    </div>
  );
};

export default Earnings;
