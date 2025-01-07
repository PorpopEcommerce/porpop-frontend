import { FormProduct } from "@/app/types/formProduct";
import { useState } from "react";

interface PriceFormProps {
  regular_price: number;
  discounted_price: number;
  discount_scheduled_from: string;
  discount_scheduled_to: string;
  onChange: (field: keyof FormProduct, value: any) => void;
}

const PriceForm: React.FC<PriceFormProps> = ({
  regular_price,
  discounted_price,
  discount_scheduled_from,
  discount_scheduled_to,
  onChange,
}) => {
  const [isScheduleEnabled, setIsScheduleEnabled] = useState(false);
  return (
    <div className="relative mt-4">
      <div className="relative grid grid-cols-2 gap-4">
        {/* Regular Price */}
        <div className="mb-3">
          <label className="block text-[12px] font-bold text-gray-700 mb-2">
            Price
          </label>
          <div className="flex">
            <div className="bg-zinc-200 flex px-2 items-center justify-center">
              <p className="text-[12px]">US$</p>
            </div>
            <input
              type="text"
              placeholder="0.00"
              value={regular_price.toString()}
              onChange={(e) =>
                onChange("regular_price", parseFloat(e.target.value) || 0)
              }
              className="block w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
            />
          </div>
        </div>

        {/* Discounted Price */}
        <div className="mb-3">
          <label className="block text-[12px] font-medium text-gray-700 mb-2">
            Discounted Price
          </label>
          <div className="flex">
            <div className="bg-zinc-200 flex px-2 items-center justify-center">
              <p className="text-[12px]">US$</p>
            </div>
            <input
              type="text"
              placeholder="0.00"
              value={discounted_price.toString()}
              onChange={(e) =>
                onChange("discounted_price", parseFloat(e.target.value) || 0)
              }
              className="block w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Schedule Toggle */}
      <div
        className="absolute top-0 right-2 cursor-pointer text-[12px]"
        onClick={() => setIsScheduleEnabled(!isScheduleEnabled)}
      >
        <span>{isScheduleEnabled ? "Cancel" : "Schedule"}</span>
      </div>

      {/* Discount Schedule */}
      {isScheduleEnabled && (
        <div className="relative grid grid-cols-2 gap-4">
          {/* Discount Scheduled From */}
          <div className="mb-3">
            <div className="flex">
              <div className="bg-zinc-200 flex px-2 items-center justify-center">
                <p className="text-[12px]">From</p>
              </div>
              <input
                type="date"
                value={discount_scheduled_from}
                onChange={(e) =>
                  onChange("discount_scheduled_from", e.target.value)
                }
                className="block w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
              />
            </div>
          </div>

          {/* Discount Scheduled To */}
          <div className="mb-3">
            <div className="flex">
              <div className="bg-zinc-200 flex px-2 items-center justify-center">
                <p className="text-[12px]">To</p>
              </div>
              <input
                type="date"
                value={discount_scheduled_to}
                onChange={(e) =>
                  onChange("discount_scheduled_to", e.target.value)
                }
                className="block w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceForm;
