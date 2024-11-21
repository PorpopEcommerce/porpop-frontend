'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";
import classNames from 'classnames';
import SearchBar from './components/nav/SearchBar';
import Cart from './components/nav/Cart';
import NavAccountComponent from './components/nav/NavAccountComponent';


interface NavBarProps {
    toggleMenu: () => void;
    toggleCart: () => void;
    toggleSignIn: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleMenu, toggleCart, toggleSignIn }) => {
    const currentPath = usePathname();
    const { userAuthenticated } = useAuth();

    const ctaLinks = [
        { label: 'NEWSLETTER', href: '/newsletter' },
        { label: 'CONTACT US', href: '/contact_us' },
        { label: 'FAQS', href: '/faqs' }
    ]
    const links = [
        { label: 'COMPARE', href: '/compare' },
        { label: 'WISHLIST', href: '/wishlist' },
        { label: 'LOGIN / RESGISTER', href: '/login_register' }
    ]

    const navigationLinks = [
        { label: 'BLOG', href: '/blog' },
        { label: 'ORDER DISPATCH', href: '/order_dispatch' },
        { label: 'TRACK ORDER', href: '/track_order' },
        { label: 'PRODUCT FILTERS', href: '/product_filters' },
    ]

    const socialLinks = [
        { id: 1, label: < FaFacebookF />, href: '/' },
        { id: 2, label: < FaLinkedinIn />, href: '/order_dispatch' },
        { id: 3, label: < FaXTwitter />, href: '/track_order' }
    ]


    return (
        <nav className='relative px-3 lg:px-5 mb-5'>
            {/* Top navigation routes */}
            <div className='hidden lg:flex lg:justify-between border-b h-10 items-center text-[10px] font-light'>
                <div className='flex space-x-3'>
                    <ul className='flex space-x-3'>
                        {ctaLinks.map(link =>
                            <Link
                                key={link.href}
                                className='text-zinc-500 hover:text-zinc-800 transition-colors'
                                href={link.href}>
                                {link.label}
                            </Link>)
                        }
                    </ul>
                    <div>
                        <p className='text-zinc-500'>24/7 WhatsApp +4474501...</p>
                    </div>
                </div>
                <div className='relative'>
                    <ul className='flex space-x-3 items-center'>
                        {links.map((link, index) => (
                            <div key={index}>
                                {index === links.length - 1 ? (

                                    userAuthenticated ? (
                                        <>
                                            <NavAccountComponent />
                                        </>

                                    ) : (
                                        <button
                                            onClick={toggleSignIn}
                                            className="text-zinc-500 hover:text-zinc-800 transition-colors"
                                        >
                                            {link.label}
                                        </button>
                                    )
                                ) : (
                                    <Link
                                        className='text-zinc-500 hover:text-zinc-800 transition-colors'
                                        href={link.href}>
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </ul>
                </div>
            </div >

            {/* Page and Social Links Navigation routes */}
            < div className='hidden lg:flex lg:justify-between py-5 items-center' >
                <div className='flex space-x-6'>
                    <div>
                        <Link className='text-5xl font-bold' href='/'>Logo</Link>
                    </div>
                    <ul className='flex space-x-3 p-0 items-center'>
                        {navigationLinks.map(link =>
                            <Link
                                key={link.href}
                                className={classNames({
                                    'underline': link.href === currentPath,
                                    'font-semibold': link.href !== currentPath,
                                    'text-xs hover:text-zinc-500': true,
                                })}
                                href={link.href}>
                                {link.label}
                            </Link>)
                        }
                    </ul>
                </div>
                <div className='flex space-x-6'>
                    <Link href='/'>
                        <div className='group p-3 border-2 hover:border-zinc-500'>
                            <p className='text-xs font-semibold group-hover:text-zinc-500'>
                                AFFILIATE MARKETPLACE
                            </p>
                        </div>
                    </Link>

                    <ul className='flex space-x-3 p-0 items-center'>
                        {socialLinks.map(link =>
                            <a
                                key={link.id}
                                href={link.href}
                                className={`text-zinc-600 border border-zinc-600 rounded-full p-2 flex items-center justify-center`}
                            >
                                {link.label}
                            </a>)
                        }
                    </ul>
                </div>


            </div >

            {/* Search and Cart control component */}
            < div className='hidden py-3 lg:flex lg:justify-between' >
                <SearchBar />
                <Cart toggleCart={toggleCart} />
            </div >

            {/* small size view */}
            < div className='lg:hidden w-full py-2' >
                <div className='flex justify-between items-center mb-3'>
                    <div className='cursor-pointer flex items-center gap-1 text-xl font-normal text-zinc-900 hover:text-zinc-500'
                        onClick={toggleMenu}
                    >
                        <CiMenuBurger />
                        <span className='text-lg'>Menu</span>
                    </div>
                    <div>
                        <Link className='text-5xl font-bold' href='/'>Logo</Link>
                    </div>
                    <Cart toggleCart={toggleCart} />
                </div>
                <SearchBar />
            </div >
        </nav >
    )
}

export default NavBar


