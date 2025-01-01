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
  // const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  // const { loading, setLoading } = useLoading();
  // const router = useRouter();

  // This ensures that the router is only used on the client
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // Handle the loading spinner based on route changes
  // useEffect(() => {
  //   if (!isMounted) return; // Prevent errors before the component is mounted

  //   const handleRouteChangeStart = () => setLoading(true);
  //   const handleRouteChangeComplete = () => setLoading(false);
  //   const handleRouteChangeError = () => setLoading(false);

  //   router.events.on("routeChangeStart", handleRouteChangeStart);
  //   router.events.on("routeChangeComplete", handleRouteChangeComplete);
  //   router.events.on("routeChangeError", handleRouteChangeError);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart);
  //     router.events.off("routeChangeComplete", handleRouteChangeComplete);
  //     router.events.off("routeChangeError", handleRouteChangeError);
  //   };
  // }, [router, setLoading, isMounted]);

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
