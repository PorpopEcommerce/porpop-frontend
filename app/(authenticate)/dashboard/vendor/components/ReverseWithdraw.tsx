import Button from "@/app/components/product/Button";
import SubHeading from "@/app/components/product/SubHeading";
import React from "react";
import DateFilter from "./product/DateFilter";

const Horizontal = () => {
  return <hr className="w-[100%]" />;
};

const ReverseWithdraw = () => {
  return (
    <div>
      <SubHeading title="REVERSE WITHDRAW" />
      <div className="my-5">
        <Horizontal />
      </div>
      <div className="mb-5">
        <div className="w-full border rounded-xl flex justify-between items-center">
          <div className="p-4">
            <h3 className="font-semibold text-sm text-[#84788c]">
              Reverse Pay Balance:
            </h3>
          </div>
          <div className="p-4">
            <h3 className="font-light text-sm text-[#84788c]">
              Threshold: 150.00
            </h3>
          </div>
        </div>
      </div>
      <DateFilter />
    </div>
  );
};

export default ReverseWithdraw;
