import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../Context/GifContext";
const contentType = ["gifs", "stickers", "texts"];
import Gif from "../Components/Gif";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoIosPaperPlane } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { Toaster } from "sonner";

const Gifpage = () => {
  const { type, slug } = useParams();
  const [currGif, setCurrGIf] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const { gf, addToFavorites, fav } = GifState();
  
  const shareGif = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          url: window.location.href // Share the current URL of the page
        });
      } catch (error) {
        console.error("Error sharing:", error.message);
      }
    } else {
      console.log("Web Share API not supported in this browser.");
      // Implement fallback behavior for browsers that do not support Web Share API
    }
  };
  

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    const fetchGif = async () => {
      const gifId = slug.split("-");
      const {data} = await gf.gif(gifId[gifId.length - 1]);
      const {data: related} = await gf.related(gifId[gifId.length - 1], {
        limit: 10,
      });
      setCurrGIf(data);
      setRelatedGifs(related);
    };

    fetchGif();
    console.log(relatedGifs)
  }, []);
  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block ">
        {currGif.user && (
          <>
            <div className="flex gap-1">
              <img
                src={currGif?.user?.avatar_url}
                alt={currGif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold text-lg">
                  {currGif?.user?.display_name}
                </div>
                <div className="text-sm">{`@${currGif?.user?.username}`}</div>
              </div>
            </div>
            {currGif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400 ">
                {/* readmore button implementation */}
                {readMore
                  ? currGif?.user?.description
                  : currGif?.user?.description.slice(0, 100) + "..."}
                  
                <span
                  className="flex items-center text-zinc-400 cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >

                  {readMore ? (
                    <>
                      Read Less <FaAngleUp />
                    </>
                  ) : (
                    <>
                      Read More <FaAngleDown />
                    </>
                  )}
                </span>
                </p>   

            )}
            {currGif?.source && (
              <div className="flex items-center text-sm font-bold gap-1 my-4">
                <HiOutlineExternalLink size={28} />
                <span>Source</span>
                <a href={currGif?.source} target="_blank" className="truncate">
                  {currGif?.source}
                </a>
              </div>
            )}
          </>
        )}
        <div className="w-full border border-gray-400 my-4"></div>

      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4 ">
            <div className="truncate mb-2 text-xl">{currGif.title}</div>
            <Gif gif={currGif} hover={false} />
            <div className="flex sm:hidden gap-1 justify-between">
           <div className="flex gap-2">
           <img
                src={currGif?.user?.avatar_url}
                alt={currGif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold text-lg">
                  {currGif?.user?.display_name}
                </div>
                <div className="text-sm">{`@${currGif?.user?.username}`}</div>
              </div>
           </div>
              <div className="flex gap-4">
              <button
            onClick={()=> addToFavorites(currGif.id)}
            className="flex gap-5 items-center font-bold text-lg">
                <FaHeart 
                size={30}
                className={`${fav.includes(currGif.id) ? 'text-red-500' : ''}`}/>
            </button>
              <button className="ml-auto" 
              onClick={shareGif}
              >
                  <IoIosPaperPlane size={28}/>
              </button>
            
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
            onClick={()=> addToFavorites(currGif.id)}
            className="flex gap-5 items-center font-bold text-lg">
                <FaHeart 
                size={30}
                className={`${fav.includes(currGif.id) ? 'text-red-500' : ''}`}/>
                Favorite
            </button>
            <button
            onClick={shareGif}
            className="flex gap-5 items-center font-bold text-lg">
             <IoIosPaperPlane size={28}/>
                Share
            </button>
            
          </div>
        </div>

        <div className="my-3">
          <span className="font-bold text-xl">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs?.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
      <Toaster richColors/>
    </div>
  );
};

export default Gifpage;
