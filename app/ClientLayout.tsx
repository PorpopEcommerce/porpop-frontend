"use client";

import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import MenuSideComponent from "./components/nav/MenuSideComponent";
import CartSideComponent from "./components/nav/CartSideComponent";
import Login_RegistrationSideComponent from "./components/nav/Login_RegistrationSideComponent";
import FooterSection from "./components/FooterSection"
import CartProvider from "./provider/CartProvider";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { useRouter } from "next/router";
// import { useLoading } from "./context/LoadingContext";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [cartDisplay, setCartDisplay] = useState(false);
  const [signInDisplay, setSignInDisplay] = useState(false);

  const toggleMenu = () => setMenuDisplay((prev) => !prev);
  const toggleCart = () => setCartDisplay((prev) => !prev);
  const toggleSignIn = () => setSignInDisplay((prev) => !prev);

  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <section>
            <main className="relative h-[100vh]">
              <div className="relative h-full flex flex-col">
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
                  <Login_RegistrationSideComponent
                    toggleSignIn={toggleSignIn}
                  />
                )}
                {/* {loading && <Spinner />} Show the spinner when loading */}
                <div className="flex-grow">{children}</div>
                <FooterSection />
              </div>
            </main>
          </section>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
};

export default ClientLayout;
