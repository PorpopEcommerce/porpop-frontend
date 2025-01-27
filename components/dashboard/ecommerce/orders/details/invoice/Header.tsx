"use client";

import Routes from "@/components/dashboard/Routes";

export default function Header() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h4 className="text-white text-2xl font-bold">Invoice</h4>

          <Routes routes={["Orders", "Order Details", "Invoice"]} />
        </div>
      </div>
    </div>
  );
}
