'use client'

import { useState } from 'react'
import NavBar from './NavBar'
import MenuSideComponent from './components/MenuSideComponent'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const [menuDisplay, setMenuDisplay] = useState(false)

    // Toggle function to pass to NavBar
    const toggleMenu = () => setMenuDisplay(prev => !prev)

    return (
        <div className="relative">
            <header>
                <NavBar toggleMenu={toggleMenu} />
            </header>
            {menuDisplay && <MenuSideComponent toggleMenu={toggleMenu} />}
            {children}
        </div>
    )
}

export default ClientLayout
