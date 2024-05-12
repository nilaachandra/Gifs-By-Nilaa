import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../Context/GifContext';
import Gif from '../Components/Gif'
const Categories = () => {
  const {categories} = useParams()

  const [result, setResult] = useState([]);

  const {gf, filter} = GifState();


  const fetchResults = async () => {
    const {data} = await gf.gifs(categories, categories, {
      limit: 25
    });
    setResult(data);
  };

  useEffect(() => {
    fetchResults();
  }, [categories]);

  return (
    <div className='flex flex-col my-4'>
        <h1 className='text-3xl font-semibold my-4'>Category : {categories} </h1>
      {result.length > 0 && (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {result.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) }
    </div>

  )
}

export default Categories