"use client";

import { FaCaretRight } from "react-icons/fa";
import Button from "@/components/Button";
import { FaCaretLeft } from "react-icons/fa6";

type TableRowProps = {
  product?: { name: string; image: string };
  sku?: string;
  quantity?: number;
  price: string;
  total: string;
};

const data: TableRowProps[] = [
  {
    product: { name: "Category 1", image: "/Images/dashboard/products/1.png" },
    sku: "345454",
    quantity: 1,
    price: "$232.00",
    total: "$232.00",
  },
  {
    product: { name: "Category 1", image: "/Images/dashboard/products/2.png" },
    sku: "345454",
    quantity: 1,
    price: "$232.00",
    total: "$232.00",
  },
  {
    price: "Subtotal",
    total: "$232.00",
  },
  {
    price: "VAT(0)%",
    total: "$0.00",
  },
  {
    price: "Shipping Rate",
    total: "$20.00",
  },
  {
    price: "Total",
    total: "$832.00",
  },
];

export default function Table() {
  return (
    <section className="bg-white rounded-lg shadow-[0px 4px 30px 0px rgba(85, 85, 85, 0.05)] text-grey-500 text-sm pb-3">
      <div className="overflow-x-scroll w-[83vw] md:w-full">
        <table className="w-full border-collapse border border-grey-25">
          <thead className="bg-grey-25">
            <tr>
              <th className="py-6 px-4 text-left text-dark-500">
                <div className="">
                  <span>Product</span>
                </div>
              </th>
              {["SKU", "Quantity", "Price", "Total"].map((header, index) => (
                <th key={index} className="py-6 px-4 text-dark-500 text-left ">
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
                <td className="py-6 px-4 border-b-[1px] border-grey-50">
                  {row.product && (
                    <div className="flex items-center gap-3">
                      <img
                        src={row.product.image}
                        alt={row.product.name}
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <p className="text-dark-500">{row.product.name}</p>
                        <p className="text-sm text-grey-500">
                          Category Description
                        </p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="text-primary-500 py-6 px-4 border-b-[1px] border-grey-50">
                  {row?.sku}
                </td>
                <td className="py-6 px-4 border-b-[1px] border-grey-50">
                  {row.quantity && `${row.quantity} pcs`}
                </td>
                <td className="py-6 px-4 border-b-[1px] border-grey-50">
                  {row.price}
                </td>
                <td className="py-6 px-4 border-b-[1px] border-grey-50">
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center mt-6">
        Should you have inquiries concerning this invoice, please contact{" "}
        <span className="font-semibold">Martha</span> on +1 (469) 227 9044
      </p>
    </section>
  );
}
