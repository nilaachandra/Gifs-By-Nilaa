import React, { useEffect, useState } from 'react'
import { GifState } from '../Context/GifContext'
import Gif from '../Components/Gif'

const Favourites = () => {
  const {gf, fav } = GifState()
  const[favGifs, setFavGifs] = useState([])


  const fetchFavGifs = async () => {
    const {data: gif} = await gf.gifs(fav)
    setFavGifs(gif)
  }
  useEffect(()=>{
    fetchFavGifs()
  },[])
  return (
    <div className='mt-2'> 
    <span className='text-3xl font-bold'>Favourites : </span>
    <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3'>
        {favGifs.map((gif) => {
          return <Gif gif={gif} key={gif.id} />
        })}
      </div>

    </div>
  )
}

export default Favourites