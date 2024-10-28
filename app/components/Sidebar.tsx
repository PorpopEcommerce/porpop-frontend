"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";


interface category {
    subtitle: string;
    subcategory: string[];
}

interface product {
    id: number;
    title: string;
    href: string;
    category: category[]
}

interface ProductDataResponse {
    productData: product[];
 }




const Sidebar = () => {
    const [itemData, setItemData] = useState<product[]>([])

    useEffect(() => {
        fetch('/db.json')
           .then((response) => {
              if (!response.ok) throw new Error("Network response was not ok");
              return response.json();
           })
           .then((data: ProductDataResponse) => setItemData(data.productData)) // Access the productData array
           .catch((error) => console.error('Error fetching data:', error));
     }, []);

    console.log(itemData)

    
    return (
        <div className='hidden lg:block group bg-white fixed h-screen transition-all duration-500 w-14 hover:w-[250px] z-20 border-r'>
            <div className="relative p-2 h-full">
                <div className="bg-yellow-400 p-2 flex justify-center gap-1 group-hover:justify-start items-center font-semibold text-xl transition-all duration-500 ease-in-out-">
                    < CiMenuBurger />
                    <p className="hidden group-hover:block transition-all duration-700">Menu</p>
                </div>
                <div className="w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500 ease-in-out">
                    <ul className="flex flex-col space-y-3">
                        {itemData.map(item => <Link
                            key={item.id}
                            href={item.href}>
                            {item.title}
                        </Link>)}
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default Sidebar

