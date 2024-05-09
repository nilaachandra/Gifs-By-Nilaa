import React, { useEffect, useState } from 'react'
import { GifState } from '../Context/GifContext'
import banner from '../assets/standard.gif'
import Gif from '../Pages/Gif'
  const Homepage = () => {
    const { gf,gifs, setGifs, filter, setFilter, fav, setFav } = GifState();
const fetchTrendingGifs = async () => {
    const {data} = await gf.trending({
      limit: 25,
      type: filter,
      rating: 'g'
    })
    setGifs(data);
  }
  useEffect(()=>{
    fetchTrendingGifs()
  },[filter])
  return (
    <div>
      <img src={banner} alt="" className='w-full lg:h-[16vh] h-[6vh] rounded-md my-3'/>

      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3'>
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif?.title} />
        })}
      </div>
    </div>
  )
}

export default Homepage