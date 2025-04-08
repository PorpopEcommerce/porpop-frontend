"use client";

import { useState, useEffect } from "react";
import NavBar from "@/app/components/header/NavBar";
import MenuSideComponent from "./components/header/nav/MenuSideComponent";
import CartSideComponent from "./components/header/nav/CartSideComponent";
import Login from "./components/header/nav/Login";
import ScrollToTop from "./components/ScrollToTop";
import CartProvider from "./provider/CartProvider";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Footer from "./LandingPage/Footer";
import { usePathname } from "next/navigation";


const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [cartDisplay, setCartDisplay] = useState(false);
  const [signInDisplay, setSignInDisplay] = useState(false);

  
  const pathName = usePathname();
  const isHome = pathName === "/";

  const toggleMenu = () => setMenuDisplay((prev) => !prev);
  const toggleCart = () => setCartDisplay((prev) => !prev);
  const toggleSignIn = () => setSignInDisplay((prev) => !prev);

  useEffect(() => {
    if (signInDisplay || menuDisplay || cartDisplay) {
      // Disable scrolling when a modal is active
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling when no modal is active
      document.body.style.overflow = "auto";
    }
  }, [signInDisplay, menuDisplay, cartDisplay]);

  useEffect(() => {
    // Listen for the custom login trigger event
    const handleLoginTrigger = () => {
      setSignInDisplay(true);
    };

    window.addEventListener("triggerLogin", handleLoginTrigger);

  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <section className="flex w-full">
            <main className="relative w-full">
              {pathName.includes("/dashboard") ||
              pathName.includes("/my_account") ||
              pathName.includes("/forget_password") ||
              pathName.includes("/reset_password") ? (
                children
              ) : (
                <div className="relative">
                  <header
                    className={`${
                      isHome ? "absolute top-0" : "bg-[#255200]"
                    } w-full z-10`}
                  >
                    <NavBar
                      toggleMenu={toggleMenu}
                      toggleCart={toggleCart}
                      toggleSignIn={toggleSignIn}
                    />
                  </header>
                  {menuDisplay && (
                    <MenuSideComponent
                      toggleMenu={toggleMenu}
                      toggleSignIn={toggleSignIn}
                    />
                  )}
                  {cartDisplay && <CartSideComponent toggleCart={toggleCart} />}
                  {signInDisplay && (
                    <Login
                      toggleSignIn={toggleSignIn}
                    />
                  )}
                  <ScrollToTop />
                  {children}
                  <section className="bg-black">
                    <Footer />
                  </section>
                </div>
              )}
            </main>
          </section>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
};

export default ClientLayout;
