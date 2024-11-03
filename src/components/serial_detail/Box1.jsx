import React, { useState, useEffect, useRef } from "react";
import { Trailerbtn } from "../Trailerbtn";

export const Box1 = ({ data, scroll, goindex,logoUrl }) => {
  const [showSeasons, setShowSeasons] = useState(false);

  return (
    <div
      className="relative inset-0 h-full justify-center bg-black text-white"
    >
      <div className="h-full w-full">
      <img
              src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
              className="h-full md:block hidden w-full"
              alt="Backdrop 2"
      />
      <img
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              className="h-full md:hidden block w-full"
              alt="Backdrop 2"
      />
      </div>
      <div className="bg-black/50 inset-0 absolute z-[1]">

      </div>
      <div className="h-full w-full absolute inset-0 z-[2]">
        <div className="h-full pt-24 text-center">
          <div className="w-full flex justify-center items-center h-2/6">
            <img
              src={logoUrl} // تغییر در اینجا
              className="h-full w-auto"
              alt=""
            />
          </div>
          <div className="flex gap-2 text-sm mt-3 w-full justify-center">
            <div className="py-0.5 px-2">
              {data.first_air_date ? data.first_air_date.slice(0, 4) : "2013"}
            </div>
            <div className="py-0.5 px-2 border-white border rounded-md">
              {data.adult ? "18+" : "16+"}
            </div>
            <div className="py-0.5 px-2">IMDB {data.vote_average}/10</div>
            <div className="py-0.5 px-2">1hr 25min</div>
          </div>
          <div className="h-1/6 overflow-auto mt-2 px-12">{data.overview}</div>
          <div className="flex mt-5 justify-center">
            <Trailerbtn scroll={scroll} goindex={goindex} />
          </div>

          {/* Toggleable Seasons List */}
          <div
            id="seasonsbox"
            className={`flex gap-3 ${
              showSeasons ? "opacity-100" : "opacity-0"
            } overflow-hidden transition-all  duration-1000 mt-5 justify-center items-center`}
          >
            {Array.from({ length: data.number_of_seasons }).map((_, index) => (
              <div key={index} className="text-endh-16">
                <div>Season {index + 1}</div>
              </div>
            ))}
          </div>
          {data.number_of_seasons != null && (
            <div
            id="seasonsicone"
            className="cursor-pointer"
            onClick={() => setShowSeasons(!showSeasons)}
          >
            Seasons
          </div>
          )}
          
        </div>
      </div>
    </div>
  );
};
