import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import name_label from "../../imgs/name_label.svg";
import { Carousel, initTWE } from "tw-elements";
import { Trailerbtn } from "../Trailerbtn";

export const Box1 = ({ data, scroll, goindex,logoUrl }) => {
  const [backgroundStyle, setbg] = useState(null);
  const [showSeasons, setShowSeasons] = useState(false); // State برای مدیریت نمایش فصل‌ها

  useEffect(() => {
    if (data && data.backdrop_path) {
      setbg({
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      });
    }
  }, [data]);

  return (
    <div
      className="relative inset-0 h-full justify-center bg-black text-white"
      style={backgroundStyle}
    >
      <div className="h-full w-full">
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