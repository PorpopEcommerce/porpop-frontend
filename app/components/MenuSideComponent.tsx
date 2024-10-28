"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';


type MenuNavLink = {
    label: string;
    href: string;
};


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





const menuNavLink = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/contact_us' },
    { label: 'AFFLITION DASHBOARD', href: '/faqs' },
    { label: 'BLOG', href: '/faqs' },
    { label: 'CONTACT US', href: '/faqs' },
    { label: 'TRACK ORDER', href: '/faqs' },
    { label: 'WISHLIST', href: '/faqs' },
    { label: 'COMPARE', href: '/faqs' },
    { label: 'LOGIN / REGISTER', href: '/faqs' }
]

interface MenuSideComponentProps {
    toggleMenu: () => void
}

const MenuSideComponent: React.FC<MenuSideComponentProps> = ({ toggleMenu }) => {
    const [categoryMenu, setCategoryMenu] = useState<product[]>([]);
    const [showMenu, setShowMenu] = useState(true)

    useEffect(() => {
        fetch('/db.json')
            .then((response) => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data: ProductDataResponse) => setCategoryMenu(data.productData)) // Access the productData array
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='lg:hidden fixed inset-0 bg-black bg-opacity-50'
            onClick={toggleMenu}>
            <div className='w-[300px] h-full bg-white'
                onClick={(e) => e.stopPropagation()}
            >
                <div className=" h-16 flex justify-center items-center px-2">
                    <SearchBar />
                </div>
                <div className="grid grid-cols-2 h-16">
                    <button className='flex justify-center items-center cursor-pointer'
                        onClick={() => setShowMenu(true)}>
                        Menu
                    </button>
                    <button className='flex justify-center items-center cursor-pointer'
                        onClick={() => setShowMenu(false)}>
                        Category
                    </button>
                </div>
                <ul className="flex flex-col space-y-3">
                    {showMenu
                        ? menuNavLink.map((item: MenuNavLink, index) => (
                            <Link
                                key={index}
                                className='text-zinc-500 hover:text-zinc-800 transition-colors'
                                href={item.href}
                                onClick={toggleMenu}>
                                {item.label}
                            </Link>
                        ))
                        : categoryMenu.map((item, index) => (
                            <Link
                                key={index}
                                className='text-zinc-500 hover:text-zinc-800 transition-colors'
                                href={item.href}
                                onClick={toggleMenu}>
                                {item.title}
                            </Link>
                        ))}
                </ul>
            </div>


        </div>
    )
}

export default MenuSideComponent
