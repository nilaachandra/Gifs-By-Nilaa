import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../Context/GifContext";
const contentType = ["gifs", "stickers", "texts"];
import Gif from "../Components/Gif";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

const Gifpage = () => {
  const { type, slug } = useParams();
  const [currGif, setCurrGIf] = useState([]);
  const [relatedGif, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const { gf } = GifState();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setCurrGIf(data);
    setRelatedGifs(related);
  };
  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content type");
    }
    fetchGif();
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
                <div
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
                </div>
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
          <div className="w-full sm:w-3/4">
            <div className="truncate mb-2 text-xl">{currGif.title}</div>
            <Gif gif={currGif} hover={false} />
            <div className="flex sm:hidden gap-1 ">
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
          </div>
          favourite/share/emebed
        </div>

        <div>
          <span className="font-bold text-xl">Related GIFs</span>
        </div>
      </div>
    </div>
  );
};

export default Gifpage;
