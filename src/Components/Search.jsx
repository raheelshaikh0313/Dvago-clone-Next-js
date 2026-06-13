import React from 'react'
import { FaSearch } from 'react-icons/fa'
function Search() {
  return (
      <div className="relative flex-1 max-w-md hidden md:block">
              <FaSearch className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder='Search for "Nutritions"'
                className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-[#8DC63F] focus:outline-none placeholder:text-gray-500 text-black hover:border-gray-400"
              />
            </div>
  )
}

export default Search