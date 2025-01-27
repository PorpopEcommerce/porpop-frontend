"use client";

import { useState } from "react";
import { FaCaretDown, FaCaretRight, FaEye } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Button from "../../../Button";
import { FaCaretLeft } from "react-icons/fa6";

type TableRowProps = {
  category: { name: string; image: string };
  sold: number;
  stock: number;
  added: string;
};

const data: TableRowProps[] = [
  {
    category: { name: "Category 1", image: "/Images/dashboard/products/1.png" },

    stock: 50,
    sold: 100,
    added: "15 Jan 2024",
  },
  {
    category: { name: "Category 2", image: "/Images/dashboard/products/2.png" },

    stock: 5,
    sold: 150,
    added: "16 Jan 2024",
  },
  {
    category: { name: "Category 1", image: "/Images/dashboard/products/3.png" },

    stock: 50,
    sold: 100,
    added: "15 Jan 2024",
  },
  {
    category: { name: "Category 2", image: "/Images/dashboard/products/4.png" },

    stock: 3,
    sold: 150,
    added: "16 Jan 2024",
  },
  {
    category: { name: "Category 1", image: "/Images/dashboard/products/5.png" },

    stock: 50,
    sold: 100,
    added: "15 Jan 2024",
  },
  {
    category: { name: "Category 2", image: "/Images/dashboard/products/6.png" },

    stock: 2,
    sold: 150,
    added: "16 Jan 2024",
  },
  {
    category: { name: "Category 3", image: "/Images/dashboard/products/3.png" },
    stock: 0,
    sold: 200,
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
    <section className="bg-dark-600 rounded-lg shadow-[0px 4px 30px 0px rgba(85, 85, 85, 0.05)] text-grey-200 text-sm pb-3">
      <div className="overflow-x-scroll">
        <table className="w-full border-collapse">
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
                    <span>Category Name</span>
                  </div>
                  <FaCaretDown />
                </div>
              </th>
              {["Sold", "Stock", "Added", "Action"].map((header, index) => (
                <th key={index} className="p-3 text-left ">
                  <div className="flex items-center justify-between">
                    <span>{header}</span>
                    {header !== "Action" && <FaCaretDown />}
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
                      src={row.category.image}
                      alt={row.category.name}
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <p className="font-semibold">{row.category.name}</p>
                      <p className="text-sm text-gray-500">
                        Category Description
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-[#B3BD9A]">{row.sold}</td>
                <td className="p-3">{row.stock}</td>
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
