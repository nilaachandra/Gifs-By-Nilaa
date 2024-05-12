import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../Context/GifContext'
const contentType = ['gifs', 'stickers', 'texts']

const Gifpage = () => {
  const {type, slug} = useParams()
  const [currGif, setCurrGIf] = useState([])
  const [relatedGif, setRelatedGifs] = useState([])
  const {gf} = GifState()

  const fetchGif = async () => {
    const gifId = slug.split('=')
    const {data} = await gf.gif(gifId[gifId.length - 1])
    const {data: related} = await gf.related(gifId[gifId.length - 1], {
      limit: 10
    })
    setCurrGIf(data)
    setRelatedGifs(related)
  }
  useEffect(()=> {
    if(!contentType.includes(type)){
      throw new Error('Invalid Content type')
    }
    fetchGif()
  },[])
  return (
    <div>
      
    </div>
  )
}

export default Gifpage