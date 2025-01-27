"use client";

import Button from "@/components/Button";
import { MdOutlineFileDownload } from "react-icons/md";
import Routes from "@/components/dashboard/Routes";
import { TbFileInvoice } from "react-icons/tb";

export default function Header() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="space-y-2">
          <h4 className="text-white text-2xl font-bold">Order Details</h4>

          <Routes routes={["Orders", "Order Details"]} />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="secondary" icon={<MdOutlineFileDownload />}>
            Export
          </Button>
          <Button variant="green" icon={<TbFileInvoice />}>
            Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
