"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";

interface Category {
    subtitle: string;
    subcategory: string[];
}

interface Product {
    id: number;
    title: string;
    href: string;
    category: Category[];
}

interface ProductDataResponse {
    productData: Product[];
}

const Sidebar = () => {
    const [itemData, setItemData] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/db.json')
            .then((response) => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data: ProductDataResponse) => setItemData(data.productData))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='hidden lg:block group bg-white fixed h-screen transition-all duration-500 w-14 hover:w-[250px] z-20 border-r'>
            <div className="relative p-2 h-full">
            
                <div className="bg-green-500 p-3 flex justify-center gap-1 group-hover:justify-start items-center font-semibold text-xl transition-all duration-500 ease-in-out">
                    <CiMenuBurger />
                    <p className="hidden group-hover:block transition-all duration-700">Menu</p>
                </div>

                <div className="w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500 ease-in-out mt-4">
                    <ul className="flex flex-col space-y-3">
                        {itemData.map(item => (
                            <li key={item.id} className="px-4 py-2 hover:bg-gray-100 rounded">
                                <Link href={item.href}>
                                    <span className="text-gray-700">{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
