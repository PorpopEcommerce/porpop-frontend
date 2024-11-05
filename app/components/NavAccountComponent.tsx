'use client'

import React from 'react'
import { VscAccount } from "react-icons/vsc";
import { IoPersonOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from '../context/AuthContext';


const NavAccountComponent = () => {
    const { logout } = useAuth();


    return (
        <div className=''>
            <div
                className="text-2xl text-zinc-500 hover:text-zinc-800 transition-colors"
            >
                <VscAccount />
            </div>
            <div className='absolute h-fit  bg-white rounded-lg shadow-md inset-0 top-8 py-4'>
                <div className='flex items-center flex-col mb-3'>
                    <div
                        className="text-7xl text-zinc-500"
                    >
                        <VscAccount />
                    </div>
                    <p className='text-xl font-semibold text-black'>alfred</p>
                </div>
                <ul className='p-0'>
                    <li className='flex items-center justify-around gap-2 p-3 text-xs hover:bg-zinc-300 hover:font-semibold'><IoPersonOutline /> <span>Profile</span></li>
                    <li className='flex'>
                        <button
                            onClick={logout}
                            className='w-full flex items-center justify-around gap-2 p-3 text-xs hover:bg-zinc-300 hover:font-semibold'>
                            <LuLogOut /> Sign Out
                        </button>
                    </li>
                </ul>


            </div>
        </div>
    )
}

export default NavAccountComponent
