'use client';

import { useState } from 'react';
import NavBar from './NavBar';
import MenuSideComponent from './components/nav/MenuSideComponent';
import CartSideComponent from './components/nav/CartSideComponent';
import Login_RegistrationSideComponent from './components/nav/Login_RegistrationSideComponent';
import Sidebar from './components/Sidebar';
import CartProvider from './provider/CartProvider';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ScrollToTop from './components/ScrollToTop'; 

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [cartDisplay, setCartDisplay] = useState(false);
    const [signInDisplay, setSignInDisplay] = useState(false);

    // Toggle functions to pass to NavBar
    const toggleMenu = () => setMenuDisplay(prev => !prev);
    const toggleCart = () => setCartDisplay(prev => !prev);
    const toggleSignIn = () => setSignInDisplay(prev => !prev);

    return (
        <Provider store={store}>
            <AuthProvider>
                <CartProvider>
                    <section className="flex overflow-hidden w-full">
                        {/* <aside>
                            <Sidebar />
                        </aside> */}
                        <main className="flex-1 relative">
                            <div className="relative">
                                <header>
                                    <NavBar
                                        // toggleMenu={toggleMenu}
                                        // toggleCart={toggleCart}
                                        // toggleSignIn={toggleSignIn}
                                    />
                                </header>
                                {menuDisplay && <MenuSideComponent toggleMenu={toggleMenu} toggleSignIn={toggleSignIn} />}
                                {cartDisplay && <CartSideComponent toggleCart={toggleCart} />}
                                {signInDisplay && <Login_RegistrationSideComponent toggleSignIn={toggleSignIn} />}
                                {children}
                                <ScrollToTop /> 
                            </div>
                        </main>
                    </section>
                </CartProvider>
            </AuthProvider>
        </Provider>
    );
};

export default ClientLayout;
