import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import svglogo from "../assets/svglogo.svg";
import { MdDashboard } from "react-icons/md";
import { GifState } from "../Context/GifContext";
const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  //getting context
  const { gf,gifs, setGifs, filter, setFilter, fav, setFav } = GifState();

  //fetch the data
  const fetchCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex items-center gap-1 ">
          <img src={svglogo} alt="GifsByNilaa" className="lg:w-16 w-12" />
          <h1 className="text-white lg:text-3xl text-xl hover:yellowtext hover-trans tracking-tight cursor-pointer font-bold poppins-bold">
            GifsByNilaa
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center">
          {/* render categories */}
          {categories?.slice(0, 5)?.map((category, index) => {
            return (
              <Link
                key={index}
                to={`/${category.name_encoded}`}
                className="h-9 pt-2 px-6 cursor-pointer rounded-md font-bold bg-slate-500 hover:yellowtext hover-trans hidden lg:block md:block"
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setShowCategories(!showCategories)}>
            <MdDashboard
              size={36}
              className="yellowtext hidden lg:block md:block"
            />
          </button>

          {/* render favourites only if the the length is more than 0 */}
          {fav.length > 0 && (
            <div className="h-9 pt-2 px-6 cursor-pointer rounded-md font-bold bg-slate-500">
              <Link to="/favourites">Favorite GIFs</Link>
            </div>
          )}

          <button className="yellowtext block lg:hidden md:hidden">
            <MdDashboard size={36} />
          </button>
        </div>
        {showCategories && (
          <div className="absolute w-full right-0 top-16 px-10 pt-6 pb-9 nav-gradient text-black font-bold z-20">
            <span className="font-semibold">Categories</span>
            <hr className="border border-black" />
            <div className="categories flex justify-between gap-3 flex-wrap mt-3">
              {categories?.map((category, i) => {
                return (
                  <Link
                    key={i}
                    to={`/${category.name_encoded}`}
                    className="h-9 pt-2 px-6 cursor-pointer rounded-md font-bold bg-slate-400 hover:yellowtext hover-trans hidden lg:block md:block"
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
