import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";
import { apikey } from "../apikey/api";
const GifContext = createContext();
const GifProvider = ({children}) => {

    const [gifs, setGifs] = useState([])
    const [filter, setFilter] = useState("gifs");
    const [fav, setFav] = useState([])

    const gf = new GiphyFetch(apikey)
    
    return <GifContext.Provider value={{gf,gifs,setGifs, filter, setFilter, fav, setFav}}>{children}</GifContext.Provider>
}
export const GifState = () => {
    return useContext(GifContext)
}
export default GifProvider;