import React, { useRef } from 'react';
import { Link } from "react-router-dom";

export const Normalslider = ({ data }) => {
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
      <div className="relative h-full mx-3 mt-5">
          {data?.length > 5 && (
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
              className={`h-64 overflow-x-auto whitespace-nowrap overflow-y-hidden scroll-smooth ${data.length < 5 ? 'flex justify-center': ''} `}
        ref={slider}
      >
        {data.map((item, index) => (
          <Link to={`/Serial/${item.id}`} key={index} className='inline-block h-full md:w-1/5 w-1/3 px-5 relative cursor-pointer'>

              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt=""
                className="h-full w-full"
              />
              <div className="absolute h-12 bottom-0 left-5 text-xs right-5 flex justify-center items-center bg-black/50 text-white backdrop-blur-[30px]">
                {item.original_name?.length > 0 ? item.original_name : item.original_title}
              </div>
          </Link>
        ))}
          </div>
          {data?.length > 5 && (
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
  );
};
