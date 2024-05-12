import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineImageSearch } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const SearchBar = () => {

  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const searchGifs = async () => {
    if(query.trim() === ""){
      return;
    }
    navigate(`/search/${query}`)
  }
  return (
    <div className='flex relative'>
      <input type='text'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder='Search GIFs or Stickers'
      className='w-full pl-4 pr-14 py-4 text-xl text-black rounded-tl rounded-bl border border-white outline-none'/>

      {query && (
        <button onClick={()=>setQuery('')}
        className='absolute bg-gray-400 rounded-full right-20 top-5 mr-4'>
          <MdCancel size={24}/>
        </button>
      )}

      <button onClick={searchGifs}
      className='nav-gradient text-black px-4 py-2 rounded-tr-md rounded-br-md'>
        <MdOutlineImageSearch size={35} />
      </button>
    </div>
  )
}

export default SearchBar