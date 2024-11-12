'use client'

import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className='lg:max-w-[500px] w-full flex h-10 border border-zinc-400'>
      <div className="flex h-full flex-1">
        <div className="cursor-pointer h-full w-10 flex justify-center items-center bg-green-400 border-r border-zinc-400">
          <CiSearch className="text-white text-xl"/>
        </div>
        <input
          type="text"
          className="flex-1 px-2 border-r border-zinc-400 focus:outline-none"
          placeholder="Search for Products"
        />
      </div>
      <div className="relative h-full px-3 hidden lg:flex">
        <div className="flex space-x-5 justify-center items-center h-full text-zinc-500">
          <p className='text-xs font-semibold'>
            SELECT CATEGORY
          </p>
          <span><IoIosArrowDown /></span>
        </div>

      </div>
    </div>
  )
}

export default SearchBar
