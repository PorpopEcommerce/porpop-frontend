import React from "react";

interface PriceFormProps {
  price: string;
  discountedPrice: string;
  scheduleDate: boolean;
  scheduledFrom: string;
  scheduledTo: string;
  onChange: (field: string, value: any) => void;
  onScheduleToggle: () => void;
}

const PriceForm: React.FC<PriceFormProps> = ({
  price,
  discountedPrice,
  scheduleDate,
  scheduledFrom,
  scheduledTo,
  onChange,
  onScheduleToggle,
}) => {
  return (
    <div className="relative mt-4">
      <div className="relative grid grid-cols-2 gap-4">
        <div className="mb-3">
          <label className="block text-[12px] font-bold text-gray-700 mb-2">Price</label>
          <div className="flex">
            <div className="bg-zinc-200 flex px-2 items-center justify-center">
              <p className="text-[12px]">US$</p>
            </div>
            <input
              type="text"
              placeholder="0.00"
              value={price}
              onChange={(e) => onChange("price", e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-[12px] font-medium text-gray-700 mb-2">Discounted Price</label>
          <div className="flex">
            <div className="bg-zinc-200 flex px-2 items-center justify-center">
              <p className="text-[12px]">US$</p>
            </div>
            <input
              type="text"
              placeholder="0.00"
              value={discountedPrice}
              onChange={(e) => onChange("discountedPrice", e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 right-2 cursor-pointer text-[12px]"
        onClick={onScheduleToggle}
      >
        <span>{scheduleDate ? "cancel" : "schedule"}</span>
      </div>

      {scheduleDate && (
        <div className="relative grid grid-cols-2 gap-4">
          <div className="mb-3">
            <div className="flex">
              <div className="bg-zinc-200 flex px-2 items-center justify-center">
                <p className="text-[12px]">From</p>
              </div>
              <input
                type="date"
                value={scheduledFrom}
                onChange={(e) => onChange("scheduledFrom", e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex">
              <div className="bg-zinc-200 flex px-2 items-center justify-center">
                <p className="text-[12px]">To</p>
              </div>
              <input
                type="date"
                value={scheduledTo}
                onChange={(e) => onChange("scheduledTo", e.target.value)}
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

