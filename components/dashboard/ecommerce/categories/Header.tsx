"use client";

import { HiPlus } from "react-icons/hi";
import Button from "../../../Button";
import { MdOutlineFileDownload } from "react-icons/md";
import Routes from "../../Routes";
import Link from "next/link";

export default function Header() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="space-y-2">
          <h4 className="text-white text-2xl font-bold">Categories</h4>

          <Routes routes={["Categories"]} />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="secondary" icon={<MdOutlineFileDownload />}>
            Export
          </Button>
          <Link href="/dashboard/ecommerce/categories/add">
            <Button variant="green" icon={<HiPlus />}>
              Add Category
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
