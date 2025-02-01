'use client'

import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className='lg:max-w-[900px] w-full flex px-2 py-1 rounded-full border border-zinc-400'>
      <div className="flex h-full flex-1">
        <input
          type="text"
          className="flex-1 px-2 focus:outline-none"
          placeholder="Search for Products"
        />
      </div>
      <div className="relative h-full hidden lg:flex">
        <div className="fit-content cursor-pointer py-2 px-3 bg-[#9bf618] rounded-full flex space-x-3 justify-center items-center h-full">
          <CiSearch className="text-white text-xl" />
          <p className='text-sm font-semibold'>
            Search
          </p>
        </div>

      </div>
    </div>
  )
}

export default SearchBar
