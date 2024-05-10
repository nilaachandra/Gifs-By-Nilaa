import React from 'react'
import { GifState } from '../Context/GifContext'
import { LuTrendingUp } from "react-icons/lu";
const filters =[
    {
        title: "GIFs",
        value: "gifs",
    },
    {
        title: "Stickers",
        value: "stickers",
    },
    {
        title:"Text",
        value: "text",
    }
]
const Filter = ({alignLeft = false, showTrending = false}) => {
    const {filter, setFilter} = GifState()
  return (
    <div className={`flex gap-3 items-center mb-3  ${alignLeft ? '' : 'justify-end' } ${showTrending ? 'justify-between flex-col sm:flex-row sm:items-center' : ""}`}>
        <label className='flex gap-3 font-bold hover:yellowtext hovertrans'>
            {showTrending && (<LuTrendingUp size={30} className='' />)}
            <span>Today's Top 10</span>
        </label>
    <div className='bg-slate-500 py-3 px-6 lg:min-w-[400px] min-w-full flex justify-between font-semibold items-center gap-4 text-xl rounded-md' >
        {filters.map((f) => {
            return <span key={f.title} className={`${filter === f.value ? 'nav-gradient text-black hover-trans px-3 rounded-md' : ''}`}
                    onClick={() => setFilter(f.value)}>
            {f.title}
            </span>
        })}
    </div>
    </div>
  )
}

export default Filter