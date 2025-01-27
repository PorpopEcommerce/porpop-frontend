"use client";

import { ReactNode, useState } from "react";
import { FaCaretDown, FaCaretRight, FaEye } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Badge from "../../Badge"; // Ensure correct import path
import Button from "../../../Button";
import { FaCaretLeft } from "react-icons/fa6";

type TableRowProps = {
  product: { name: string; image: string };
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: ReactNode;
  added: string;
};

const data: TableRowProps[] = [
  {
    product: { name: "Product 1", image: "/Images/dashboard/products/1.png" },
    sku: "SKU001",
    category: "Category A",
    stock: 50,
    price: 100,
    status: <Badge variant="published" />,
    added: "15 Jan 2024",
  },
  {
    product: { name: "Product 2", image: "/Images/dashboard/products/2.png" },
    sku: "SKU002",
    category: "Category B",
    stock: 5,
    price: 150,
    status: <Badge variant="lowStock" />,
    added: "16 Jan 2024",
  },
  {
    product: { name: "Product 1", image: "/Images/dashboard/products/3.png" },
    sku: "SKU001",
    category: "Category A",
    stock: 50,
    price: 100,
    status: <Badge variant="published" />,
    added: "15 Jan 2024",
  },
  {
    product: { name: "Product 2", image: "/Images/dashboard/products/4.png" },
    sku: "SKU002",
    category: "Category B",
    stock: 3,
    price: 150,
    status: <Badge variant="lowStock" />,
    added: "16 Jan 2024",
  },
  {
    product: { name: "Product 1", image: "/Images/dashboard/products/5.png" },
    sku: "SKU001",
    category: "Category A",
    stock: 50,
    price: 100,
    status: <Badge variant="published" />,
    added: "15 Jan 2024",
  },
  {
    product: { name: "Product 2", image: "/Images/dashboard/products/6.png" },
    sku: "SKU002",
    category: "Category B",
    stock: 2,
    price: 150,
    status: <Badge variant="lowStock" />,
    added: "16 Jan 2024",
  },
  {
    product: { name: "Product 3", image: "/Images/dashboard/products/2.png" },
    sku: "SKU003",
    category: "Category C",
    stock: 0,
    price: 200,
    status: <Badge variant="unpublished" />,
    added: "17 Jan 2024",
  },
];

export default function Table() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : data.map((_, index) => index));
  };

  const handleRowSelect = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="bg-dark-600 rounded-lg overflow-x-scoll shadow-[0px 4px 30px 0px rgba(85, 85, 85, 0.05)] text-grey-200 text-sm pb-3 lg:w-fit">
      <div className="overflow-x-scroll">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <span>Product</span>
                  </div>
                  <FaCaretDown />
                </div>
              </th>
              {[
                "SKU",
                "Category",
                "Stock",
                "Price",
                "Status",
                "Added",
                "Action",
              ].map((header, index) => (
                <th key={index} className="p-3 text-left ">
                  <div className="flex items-center justify-between">
                    <span>{header}</span>
                    {header !== "Action" &&
                      header !== "SKU" &&
                      header !== "Category" && <FaCaretDown />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                    <img
                      src={row.product.image}
                      alt={row.product.name}
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <p className="font-semibold">{row.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Product Description
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-[#B3BD9A]">{row.sku}</td>
                <td className="p-3">{row.category}</td>
                <td className="p-3">{row.stock}</td>
                <td className="p-3">${row.price.toFixed(2)}</td>
                <td className="p-3">{row.status}</td>
                <td className="p-3">{row.added}</td>
                <td className="p-3 flex gap-2 items-center">
                  <MdEdit className="text-lg cursor-pointer hover:text-green-500" />
                  <FaEye className="text-lg cursor-pointer hover:text-blue-500" />
                  <IoMdTrash className="text-lg cursor-pointer hover:text-red-500" />
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
    </section>
  );
}
