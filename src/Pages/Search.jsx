import {useEffect, useState} from "react";
import {GifState} from "../Context/GifContext";
import {useParams} from "react-router-dom";
import Gif from "../Components/Gif";
import Filter from "../Components/Filter";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const {gf, filter} = GifState();

  const {query} = useParams();

  const fetchSearchResults = async () => {
    const {data} = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });

    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-3xl pb-3 font-bold">Results for Search Query : {query}</h2>
      <Filter alignLeft={true} />
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for {query}. Please search for the right query!
        </span>
      )}
    </div>
  );
};

export default Search;