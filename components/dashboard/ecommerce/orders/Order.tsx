import { BsThreeDotsVertical } from "react-icons/bs";
import Badge from "../../Badge";

export default function Order() {
  return (
    <div className="rounded-lg border border-transparent hover:border-white transitionItem cursor-pointer shadow-[0px 4px 30px 0px rgba(85, 85, 85, 0.05] bg-dark-600 px-3 py-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4 justify-between text-xs">
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <p className="text-primary-500">302032</p>
            <p className="text-grey-300">29 Dec 2002</p>
          </div>

          <div className="flex items-center">
            <BsThreeDotsVertical className="text-lg text-grey-300" />
          </div>
        </div>

        <hr className="border border-dashed border-grey-300" />

        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/Images/dashboard/products/2.png"
              alt="product"
              className="w-10 h-10 rounded"
            />
            <div className="space-y-2">
              <p className="font-semibold text-white">Smartwatch E2 Black</p>
              <p className="text-sm text-gray-500">1 x $40.00</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-12">
            <div className="space-y-2">
              <p className="text-grey-300 text-xs">Total</p>
              <p className="text-white">$234.00</p>
            </div>

            <div className="space-y-2">
              <p className="text-grey-300 text-xs">Customer</p>
              <p className="text-white">Jass Blair</p>
            </div>

            <div className="space-y-2">
              <p className="text-grey-300 text-xs">Payment</p>
              <p className="text-white">Mastercard</p>
            </div>

            <div className="space-y-2">
              <p className="text-grey-300 text-xs">Shipping Method</p>
              <p className="text-white">Flat Shipping</p>
            </div>

            <div className="flex items-center">
              <Badge variant="delivered" />
            </div>
          </div>
        </div>
        <p className="ml-12 text-sm text-gray-500">+3 Other Product</p>
      </div>
    </div>
  );
}
