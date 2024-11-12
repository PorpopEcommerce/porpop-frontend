"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import classNames from 'classnames';
import SearchBar from './SearchBar';

type MenuNavLink = {
    label: string;
    href: string;
};

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

const menuNavLink = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/contact_us' },
    { label: 'AFFILIATION DASHBOARD', href: '/faqs' },
    { label: 'BLOG', href: '/faqs' },
    { label: 'CONTACT US', href: '/faqs' },
    { label: 'TRACK ORDER', href: '/faqs' },
    { label: 'WISHLIST', href: '/faqs' },
    { label: 'COMPARE', href: '/faqs' },
    { label: 'LOGIN / REGISTER', href: '/faqs' }
];

interface MenuSideComponentProps {
    toggleMenu: () => void;
    toggleSignIn: () => void;
}

const MenuSideComponent: React.FC<MenuSideComponentProps> = ({ toggleMenu, toggleSignIn }) => {
    const [categoryMenu, setCategoryMenu] = useState<Product[]>([]);
    const [showMenu, setShowMenu] = useState(true);

    const { userAuthenticated } = useAuth();

    useEffect(() => {
        fetch('/db.json')
            .then((response) => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data: ProductDataResponse) => setCategoryMenu(data.productData))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='lg:hidden fixed inset-0 bg-black bg-opacity-50' onClick={toggleMenu}>
            <div className='w-[300px] h-full bg-white' onClick={(e) => e.stopPropagation()}>

                <div className="h-16 flex justify-center items-center px-2">
                    <SearchBar />
                </div>

                <div className="grid grid-cols-2 h-16">
                    <button
                        className={classNames({
                            'border-b-2 border-green-500 bg-zinc-300': showMenu === true,
                            'font-semibold': showMenu !== true,
                            'hover:text-zinc-500 flex justify-center items-center cursor-pointer': true,
                        })}
                        onClick={() => setShowMenu(true)}>
                        Menu
                    </button>
                    <button
                        className={classNames({
                            'border-b-2 border-green-500 bg-zinc-300': showMenu !== true,
                            'font-semibold': showMenu === true,
                            'hover:text-zinc-500 flex justify-center items-center cursor-pointer': true,
                        })}
                        onClick={() => setShowMenu(false)}>
                        Category
                    </button>
                </div>

                <ul className="flex flex-col mt-4 space-y-2">
                    {showMenu
                        ? menuNavLink.map((item: MenuNavLink, index) => (
                            <li key={index} className="relative" onClick={toggleMenu}>
                                {index === menuNavLink.length - 1 ? (
                                    userAuthenticated ? (
                                        <Link
                                            className='text-zinc-700 font-bold hover:text-zinc-800 transition-colors block py-2 px-4 text-sm'
                                            href='/my_account'>
                                            MY ACCOUNT
                                        </Link>

                                    ) : (
                                        <button
                                            onClick={toggleSignIn}
                                            className="text-zinc-700 font-bold hover:text-zinc-800 transition-colors block py-2 px-4 text-sm">
                                            {item.label}
                                        </button>
                                    )

                                ) : (
                                    <Link
                                        className='text-zinc-700 font-bold hover:text-zinc-800 transition-colors block py-2 px-4 text-sm'
                                        href={item.href}>
                                        {item.label}
                                    </Link>
                                )}

                                <hr className="w-full border-t border-gray-300 absolute left-0" />
                            </li>
                        ))
                        : categoryMenu.map((item, index) => (
                            <li key={index} className="relative">
                                <Link
                                    className="text-zinc-700 font-bold hover:text-zinc-800 transition-colors block py-2 px-4 text-sm"
                                    href={item.href}
                                    onClick={toggleMenu}
                                >
                                    {item.title}
                                </Link>

                                <hr className="w-full border-t border-gray-300 absolute left-0" />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default MenuSideComponent;
