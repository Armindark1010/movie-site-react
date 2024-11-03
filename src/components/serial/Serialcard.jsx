import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Seriscard } from "./Seriscardslide";
import { Carousel } from "flowbite";
import data from "../../database/db.json";
import { Serialindicator } from "./Serialindicator";
import { Link } from "react-router-dom";
export const Serialcard = () => {
  const carouselRef = useRef(null);
  const slider = useRef(null);
  const [films, setFilms] = useState(data.Films);
  const [id, setid] = useState(data.Films[2].id);
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
  useEffect(() => {
    if (films.length > 0) {
      const carouselElement = document.getElementById("carousel-seris");
      const items = films.map((_, index) => ({
        position: index,
        el: document.getElementById(`carousel-seris-${index}`),
      }));

      const options = {
        defaultPosition: 2,
        interval: 3000,
        indicators: {
          activeClasses: "text-red-800",
          inactiveClasses: "text-sm inactiveClasses",
          items: films.map((_, index) => ({
            position: index,
            el: document.getElementById(`carousel-indicator-serial-${index}`),
          })),
        },
      };

      carouselRef.current = new Carousel(carouselElement, items, options);

      return () => {
        carouselRef.current.destroy();
      };
    }
  }, [films]);

  return (
    <div
      id="carousel-seris"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <div className="relative h-[70vh] overflow-hidden z-10 rounded-lg">
        {films.map((item, index) => (
          <div
            id={`carousel-seris-${index}`}
            key={index}
            className={`hidden w-full h-full duration-700 ease-in-out ${
              index === 0 ? "block" : ""
            }`}
          >
            <div className="absolute block z-50 w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <Seriscard item={item} />
            </div>
          </div>
        ))}
      </div>
      <div className="h-[20vh] z-20 bg-black/20 shadow-[0px_-20px_20px_20px_black]  backdrop-blur-[20px] absolute md:bottom-0 bottom-[10vh] right-0 left-0">
        <div className="flex justify-center text-red-600 cursor-pointer hover:text-blue-600 absolute top-[-50px] left-0 right-0">
          <Link
            to={`/movie-site-react/Serial/${id}`}
            className="bg-black/50 px-4 backdrop-blur-[80px]  py-2 my-text rounded-full cursor-pointer"
          >
            Show more
          </Link>
        </div>
        <div className="flex w-full h-full justify-between md:gap-5 gap-2 pb-2 px-5">
          <button
            onClick={() => scrollLeft(slider)}
            className="absolute md:hidden left-0 top-0 bottom-0 z-10 flex justify-center items-center text-white p-2"
          >
            <div className="py-4 px-2 bg-black/30 backdrop-blur-[30px] rounded-md hover:bg-black/70 border">
              {"<"}
            </div>
          </button>

          <div
            className={`h-full w-full md:mx-12 overflow-x-hidden whitespace-nowrap md:flex md:justify-center md:gap-5 overflow-y-hidden scroll-smooth `}
            ref={slider}
          >
            {films.map((item, index) => (
              <div className="inline-block px-2 md:px-0 h-full md:w-full w-1/3 relative cursor-pointer" key={index}>
                <Serialindicator index={index} setid={setid} id={item.id} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollRight(slider)}
            className="absolute md:hidden right-0  top-0 bottom-0 z-10 flex justify-center items-center text-white p-2"
          >
            <div className="py-4 px-2 bg-black/30 backdrop-blur-[30px] rounded-md hover:bg-black/70 border">
              {">"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
