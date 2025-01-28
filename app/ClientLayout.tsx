"use client";

import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import MenuSideComponent from "./components/nav/MenuSideComponent";
import CartSideComponent from "./components/nav/CartSideComponent";
import Login from "./components/nav/Login";
import ScrollToTop from "./components/ScrollToTop";
import CartProvider from "./provider/CartProvider";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Footer from "./LandingPage/Footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [cartDisplay, setCartDisplay] = useState(false);
  const [signInDisplay, setSignInDisplay] = useState(false);

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

  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <section className="flex w-full">
            <main className="relative w-full">
              <div className="relative">
                <header>
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
            </main>
          </section>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
};

export default ClientLayout;
