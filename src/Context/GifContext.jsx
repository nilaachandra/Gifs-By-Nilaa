import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";
import { apikey } from "../apikey/api";
import { toast, Toaster } from "sonner";
const GifContext = createContext();
const GifProvider = ({children}) => {

    const [gifs, setGifs] = useState([])
    const [filter, setFilter] = useState("gifs");
    const [fav, setFav] = useState([])

    const addToFavorites = (id) => {
        if(fav.includes(id)) {
            const updatedFavs = fav.filter((itemId) => itemId !== id)
            localStorage.setItem('favoriteGifs', JSON.stringify(updatedFavs))
            setFav(updatedFavs)
            toast.error('Removed From Favorites',{
                position: 'top-center',
                richColors: true,
                duration: 3000,
            })
     
        } else {
            const updatedFavs = [...fav]
            updatedFavs.push(id)
            localStorage.setItem("favoriteGifs", JSON.stringify(updatedFavs))
            setFav(updatedFavs)
            toast.success('Added To Favorites',{
                position: 'top-center',
                richColors: true,
                duration: 3000,
            })
        }
        
    }

    useEffect(()=>{
        const favorites = JSON.parse(localStorage.getItem('favoriteGifs')) || [];
        setFav(favorites)
    },[])

    const gf = new GiphyFetch(apikey)
    
    return <GifContext.Provider value={{gf,gifs,setGifs, filter, setFilter, fav, setFav, addToFavorites}}>{children}</GifContext.Provider>
}
export const GifState = () => {
    return useContext(GifContext)
}
export default GifProvider;