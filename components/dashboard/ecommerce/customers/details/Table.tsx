"use client";

import { FaCalendar, FaCaretRight } from "react-icons/fa";
import Button from "@/components/Button";
import { FaCaretLeft, FaSliders } from "react-icons/fa6";
import Badge from "@/components/dashboard/Badge";
import Section from "@/components/dashboard/Section";

type TableRowProps = {
  orderId: string;
  product: { name: string; image: string };
  status: "processing" | "shipped" | "delivered";
  date: string;
  total: string;
};

const data: TableRowProps[] = [
  {
    orderId: "302002",
    product: { name: "Category 1", image: "/Images/dashboard/products/1.png" },
    total: "$232.00",
    status: "processing",
    date: "22 Dec 2023",
  },
  {
    orderId: "302002",
    product: { name: "Category 1", image: "/Images/dashboard/products/2.png" },
    total: "$232.00",
    status: "processing",
    date: "22 Dec 2023",
  },
  {
    orderId: "302002",
    product: { name: "Category 1", image: "/Images/dashboard/products/3.png" },
    total: "$232.00",
    status: "processing",
    date: "22 Dec 2023",
  },
];

export default function Table() {
  return (
    <Section noPaddingX>
      <div className="px-4 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl text-white font-semibold">
          Transaction History
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="dark" icon={<FaCalendar />}>
            Select Date
          </Button>
          <Button variant="dark" icon={<FaSliders />}>
            Filters
          </Button>
        </div>
      </div>

      <div className="overflow-x-scroll w-[91vw] md:w-full">
        <table className="border-collapse mt-4">
          <thead className="bg-dark-700">
            <tr>
              <th className="py-4 px-4 text-left">
                <div className="">
                  <span>Order ID</span>
                </div>
              </th>
              <th className="py-4 px-4 text-left">
                <div className="">
                  <span>Product</span>
                </div>
              </th>
              {["Total", "Status", "Date"].map((header, index) => (
                <th key={index} className="py-4 px-4 text-left ">
                  <div className="flex items-center justify-between">
                    <span>{header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="">
                <td className="py-4 px-4 border-b-[1px] border-dark-500">
                  {row.orderId}
                </td>
                <td className="py-4 px-4 border-b-[1px] border-dark-500">
                  {row.product && (
                    <div className="flex items-center gap-3">
                      <img
                        src={row.product.image}
                        alt={row.product.name}
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <p className="font-semibold">{row.product.name}</p>
                        <p className="text-sm text-gray-500">
                          Category Description
                        </p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="text-[#B3BD9A] py-4 px-4 border-b-[1px] border-dark-500">
                  {row.total}
                </td>
                <td className="py-4 px-4 border-b-[1px] border-dark-500">
                  <div>
                    <Badge variant="lowStock" />
                  </div>
                </td>
                <td className="py-4 px-4 border-b-[1px] border-dark-500 text-grey-200">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between mt-3 px-3">
        <p className="text-grey-300">Showing 1-10 from 100</p>

        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<FaCaretLeft />} />
          <Button variant="secondary">1</Button>
          <Button variant="secondary">2</Button>
          <Button variant="secondary">...</Button>
          <Button variant="secondary" icon={<FaCaretRight />} />
        </div>
      </div>
    </Section>
  );
}
