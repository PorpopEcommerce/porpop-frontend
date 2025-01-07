"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/assets/porpopLogo.jpg";
import { useAuth } from "./context/AuthContext";
import { CiMenuBurger } from "react-icons/ci";
import classNames from "classnames";
import SearchBar from "./components/nav/SearchBar";
import Cart from "./components/nav/Cart";
import NavAccountComponent from "./components/nav/NavAccountComponent";
import Image from "next/image";

interface NavBarProps {
  toggleMenu: () => void;
  toggleCart: () => void;
  toggleSignIn: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  toggleMenu,
  toggleCart,
  toggleSignIn,
}) => {
  const currentPath = usePathname();
  const { user } = useAuth();

  const navigationLinks = [
    { label: "BLOG", href: "/blog" },
    { label: "ORDER DISPATCH", href: "/order_dispatch" },
    { label: "TRACK ORDER", href: "/track_order" },
    { label: "PRODUCT FILTERS", href: "/product_filters" },
  ];

  return (
    <nav className="relative bg-transparent px-3 lg:px-5 mb-5 max-w-[100rem] mx-auto">
      <div className="hidden lg:flex lg:flex-col">
        {/* Top navigation routes */}
        <div className="py-3 flex justify-between border-b items-center text-[10px] font-light">
          <div>
            <Link className="text-5xl font-bold" href="/">
              <Image src={Logo} alt="Porpop Logo " />
            </Link>
          </div>

          <div className="flex gap-4 w-fit">
            <Cart toggleCart={toggleCart} />

            {user ? (
              <NavAccountComponent />
            ) : (
              <div className="w-fit">
                <div>
                  <Link href="/login_signin">
                    <button className="text-[15px] font-semibold py-2 px-3 bg-[#9bf618] rounded-lg">
                      Sign in
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Page and Social Links Navigation routes */}
        <div className="flex justify-between py-5 items-center">
          <div className="flex">
            <SearchBar />
          </div>
          <div className="flex space-x-6">
            <ul className="flex space-x-3 p-0 items-center">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  className={classNames({
                    underline: link.href === currentPath,
                    "font-semibold": link.href !== currentPath,
                    "text-sm hover:text-zinc-500": true,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* small size view */}
      <div className="lg:hidden w-full py-2">
        <div className="flex justify-between items-center mb-3">
          <div
            className="cursor-pointer flex items-center gap-1 text-xl font-normal text-zinc-900 hover:text-zinc-500"
            onClick={toggleMenu}
          >
            <CiMenuBurger />
            <span className="text-lg">Menu</span>
          </div>
          <div>
            <Link className="text-5xl font-bold" href="/">
              <Image src={Logo} alt="Porpop Logo" />
            </Link>
          </div>
          <Cart toggleCart={toggleCart} />
        </div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
