import Button from "@/app/components/product/Button";
import SubHeading from "@/app/components/product/SubHeading";
import React from "react";

const Horizontal = () => {
  return <hr className="w-[100%]" />;
};

const WithDraw = () => {
  return (
    <div>
      <SubHeading title="WITHDRAW" />
      <div className="my-5">
        <Horizontal />
      </div>
      <div className="mb-5">
        <div className="w-full border">
          <div className="border p-4 bg-[#f5f5f5]">
            <h3 className="font-semibold">Balance</h3>
          </div>
          <div className="flex justify-between items-center p-4">
            <div className="space-y-2">
              <p className="text-sm text-[#84788c]">
                Your Balance <span></span>
              </p>
              <p className="text-sm text-[#84788c]">
                Minimum Withdrawal Amount <span></span>
              </p>
            </div>

            <div>
              <Button label="REQUEST WITHDRAW" custom="max-w-fit text-sm bg-[#f7f7f7]" />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="w-full border">
          <div className="border p-4 bg-[#f5f5f5]">
            <h3 className="font-semibold">Payment Details</h3>
          </div>
          <div>
            <div className="flex justify-between items-center p-4">
              <div className="space-y-2">
                <p className="text-sm text-[#84788c]">
                  Last payment <span></span>
                </p>
                <p className="text-sm text-[#84788c]">
                  You don't have any approved withdraw yet <span></span>
                </p>
              </div>

              <div>
                <Button label="VIEW PAYMENTS" custom="max-w-fit text-sm bg-[#f7f7f7]" />
              </div>
            </div>

            <div className="px-4">
              <Horizontal />
            </div>

            <div className="flex justify-between items-center p-4">
              <div className="space-y-2">
                <p className="text-sm text-[#84788c]">
                  Schedule <span></span>
                </p>
                <p className="text-sm text-[#84788c]">
                  Please update your withdraw schedule selection to get payment
                  automatically. <span></span>
                </p>
              </div>

              <div>
                <Button label="EDIT SCHEDULE" custom="max-w-fit text-sm bg-[#f7f7f7]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="w-full border">
          <div className="border p-4 bg-[#f5f5f5]">
            <h3 className="font-semibold">Payment Methods</h3>
          </div>
          <div>
            <div className="flex justify-between items-center p-4">
              <div className="space-y-2">
                <p className="text-sm text-[#84788c]">
                  Bank Transfer <span></span>
                </p>
              </div>

              <div>
                <Button label="SET UP" custom="max-w-fit text-sm bg-[#f7f7f7]" />
              </div>
            </div>

            <div className="px-4">
              <Horizontal />
            </div>

            <div className="flex justify-between items-center p-4">
              <div className="space-y-2">
                <p className="text-sm text-[#84788c]">
                  Paystack <span></span>
                </p>
              </div>

              <div>
                <Button label="SET UP" custom="max-w-fit text-sm bg-[#f7f7f7]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithDraw;
