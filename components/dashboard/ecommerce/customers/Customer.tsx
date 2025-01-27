import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import Badge from "./Badge";

export default function Customer() {
  return (
    <div className="bg-dark-600 p-4 rounded-lg space-y-3">
      <div className="flex items-start gap-4">
        <input type="checkbox" className="w-4 h-4 cursor-pointer" />

        <Image
          src="/Images/dashboard/customers/customer.png"
          alt="customer"
          height={80}
          width={80}
          className="object-cover grow"
        />

        <BsThreeDotsVertical className="cursor-pointer text-lg text-grey-300" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold text-white">Josh Bill</p>
        <Badge variant="active" />
      </div>

      <div className="px-4 flex justify-between">
        <div className="space-y-2">
          <p className="text-grey-300 text-xs text-center">Orders</p>
          <p className="text-white text-center">34,234</p>
        </div>

        <div className="space-y-2">
          <p className="text-grey-300 text-xs text-center">Balance</p>
          <p className="text-white text-center">$45,903</p>
        </div>
      </div>
    </div>
  );
}
