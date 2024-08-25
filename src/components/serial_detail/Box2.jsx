import { HeaderBox } from "../HeaderBox";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
export const Box2 = ({ credits, film_id }) => {
  const slider = useRef(null);

  const scrollLeft = (scrollRef) => {
    scrollRef.current.scrollBy({
      left: -scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = (scrollRef) => {
    scrollRef.current.scrollBy({
      left: scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex w-full justify-center items-center md:px-12 h-full">
      <div className="h-2/3 mt-16 w-full text-white">
        <div className="h-[10%]">
          <HeaderBox text="Top Cast" />
        </div>
        <div className="w-full h-[90%] overflow-x-auto px-2 flex-col-reverse md:flex-wrap justify-center md:flex hidden">
          {credits.map((item) => (
            <Link
              to={`/movie-site-react/person/${item.id}/${film_id}`}
              class="avatar group/item gap-2 items-center cursor-pointer"
            >
              <div class="ring-error ring-offset-base-100 w-16 rounded-full ring ring-offset-2 group-hover/item:ring-primary">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                />
              </div>
              <div className="ml-4 h-32 w-full !flex !flex-col !justify-center">
                <div>{item.original_name}</div>
                <div>{item.character}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="relative h-2/3 mx-3 mt-5 md:hidden block">
          {credits?.length > 5 && (
            <button
              onClick={() => scrollLeft(slider)}
              className="absolute left-0 top-0 bottom-0 z-10 flex justify-center items-center text-white p-2"
            >
              <div className="py-4 px-2 bg-black/30 backdrop-blur-[30px] rounded-md hover:bg-black/70 border">
                {"<"}
              </div>
            </button>
          )}

          <div
            className={`h-64 overflow-x-auto whitespace-nowrap overflow-y-hidden scroll-smooth ${
              credits.length < 2 ? "flex justify-center" : ""
            } `}
            ref={slider}
          >
            {credits.map((item, index) => (
              <Link
                to={`/movie-site-react/Serial/${item.id}`}
                key={index}
                className="inline-block h-full md:w-1/5 sm:w-1/3 w-1/2 px-5 relative cursor-pointer"
              >
                <div className="flex justify-center items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    className="rounded-full h-40 w-40"
                  />
                </div>
                <div>{item.original_name}</div>
                <div>{item.character}</div>
              </Link>
            ))}
          </div>
          {credits?.length > 5 && (
            <button
              onClick={() => scrollRight(slider)}
              className="absolute right-0 top-0 bottom-0 z-10 flex justify-center items-center text-white p-2"
            >
              <div className="py-4 px-2 bg-black/30 backdrop-blur-[30px] rounded-md hover:bg-black/70 border">
                {">"}
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
