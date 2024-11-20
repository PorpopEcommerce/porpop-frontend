'use client'

import { useState } from 'react'
import NavBar from './NavBar'
import MenuSideComponent from './components/MenuSideComponent'
import CartSideComponent from './components/CartSideComponent'
import Login_RegistrationSideComponent from './components/Login_RegistrationSideComponent'
import LandingPage from './LandingPage'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [cartDisplay, setCartDisplay] = useState(false);
    const [signInDisplay, setSignInDisplay] = useState(false);

    // Toggle function to pass to NavBar
    const toggleMenu = () => setMenuDisplay(prev => !prev);
    const toggleCart = () => setCartDisplay(prev => !prev);
    const toggleSignIn = () => setSignInDisplay(prev => !prev);

    return (
        <div className="relative">
            <header>
                <NavBar
                    toggleMenu={toggleMenu}
                    toggleCart={toggleCart}
                    toggleSignIn={toggleSignIn}
                />
            </header>
            {menuDisplay && <MenuSideComponent toggleMenu={toggleMenu} toggleSignIn={toggleSignIn}/>}
            {cartDisplay && <CartSideComponent toggleCart={toggleCart} />}
            {signInDisplay && <Login_RegistrationSideComponent toggleSignIn={toggleSignIn} />}

            <LandingPage />

            {children}
        </div>
    )
}

export default ClientLayout
