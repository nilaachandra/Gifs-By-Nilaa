import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import svglogo from '../assets/svglogo.svg'
import { MdDashboard } from "react-icons/md";
const Header = () => {
    const [categories, setCategories] = useState([])
    const [showCategories, setShowCategories] = useState(false)
  return (
    <nav>
        <div className='relative flex gap-4 justify-between items-center mb-2'>
            <Link to='/' className='flex items-center gap-1 '>
                <img src={svglogo} alt="GifsByNilaa" className='lg:w-16 w-12'/>
                <h1 className='text-white lg:text-3xl text-xl hover:yellowtext hover-trans tracking-tight cursor-pointer font-bold poppins-bold'>GifsByNilaa</h1>
            </Link>
            <div className='font-bold text-md flex gap-2 items-center'>
            {/* render categories */}
            <Link className='h-9 pt-2 px-6 cursor-pointer rounded-md font-bold bg-slate-500 hover:yellowtext hover-trans hidden lg:block md:block'>
                Reactions
            </Link>
            <button onClick={()=>setShowCategories(!showCategories)}>
            <MdDashboard size={36} className='yellowtext hidden lg:block md:block'/>
            </button>
            <div className="h-9 pt-2 px-6 cursor-pointer rounded-md font-bold bg-slate-500">
                <Link to='/favourites'>Favorite GIFs</Link>
            </div>

            <button className='yellowtext block lg:hidden md:hidden'>
                <MdDashboard size={36} />
            </button>
            </div>
        {
            showCategories && 
            <div className='absolute w-full right-0 top-16 px-10 pt-6 pb-9 nav-gradient text-black font-bold z-20'>
                <span className='font-semibold'>Categories</span>
                <hr className='border border-black'/>
            </div>
        }
</div>
    </nav>
  )
}

export default Header