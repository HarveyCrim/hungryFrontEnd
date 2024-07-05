import React from 'react'
import { FaSearch } from "react-icons/fa";
const Searchbox = () => {
  return (
    <div className = "flex mx-auto justify-between rounded-full w-[90%] items-center border-2 p-2 md:py-4">
        <div className='flex items-center space-x-2'>
            <FaSearch className='fill-orange-500' size = {28}/>
            <input className = "text-lg md:text-xl w-[50vw] outline-none" type = "text" placeholder = "Search City or Town"/>
        </div>
        <button className = "rounded-full bg-orange-500 text-white py-2 px-4 md:text-xl font-semibold">Search</button>
    </div>
  )
}

export default Searchbox