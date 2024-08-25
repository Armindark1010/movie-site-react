import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HeaderBox } from "../HeaderBox";
import { Link } from "react-router-dom";
import { Normalslider } from "../Normalslider";

export const Serial_list = () => {
  const [popular, Setpopular] = useState([]);
  const [top_rated, Settop_rated] = useState([]);
  const popularScrollRef = useRef(null);
  const airingTodayScrollRef = useRef(null);

  const get_list_of_serials = async () => {
    try {
      const popular = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=fca43d4c1dc3416dd0309cde841c540a"
      );
      const top_rated = await axios.get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=fca43d4c1dc3416dd0309cde841c540a"
      );
      Setpopular(popular.data.results);
      Settop_rated(top_rated.data.results);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the data.");
    }
  };

  useEffect(() => {
    get_list_of_serials();
  }, []);



  return (
    <div className="h-full w-full flex flex-col justify-around">
      {/* Popular Section */}
      <div className="w-full">
        <HeaderBox text="popular" />
        {/* <div className="relative mx-3 mt-5">
          <button
            onClick={() => scrollLeft(popularScrollRef)}
            className="absolute left-0 top-0 bottom-0 z-10 flex justify-center items-center text-white p-2"
          >
            <div className="py-4 px-2 bg-black/30 backdrop-blur-[30px] rounded-md hover:bg-black/70 border">
              {"<"}
            </div>
          </button>
          <div
            className="h-64 overflow-x-auto whitespace-nowrap scroll-smooth"
            ref={popularScrollRef}
          >
            {popular.map((item, index) => (
              <div
                className="inline-block h-full w-1/5 px-5 relative cursor-pointer"
                key={index}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt=""
                  className="h-full w-full"
                />
                <div className="absolute h-12 bottom-0 left-5 right-5 flex justify-center items-center bg-black/50 text-white backdrop-blur-[30px]">
                  {item.original_name}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollRight(popularScrollRef)}
            className="absolute right-0 top-0 bottom-0 z-10 flex justify-center items-center text-white p-2"
          >
            <div className="py-4 px-2 bg-black/30 backdrop-blur-[30px] rounded-md hover:bg-black/70 border">
              {">"}
            </div>
          </button>
        </div> */}
        <Normalslider data={popular} />
      </div>

      <div className="w-full mt-8">
        <HeaderBox text="top_rated" />
        <Normalslider data={top_rated} />
      </div>
    </div>
  );
};
