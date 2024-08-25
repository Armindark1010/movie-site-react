import { Carousel } from "flowbite";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Imgcollention } from "./Imgcollention";
import $ from "jquery";
export const Slider = () => {
  const [Slide_data, SetSlide_data] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const carouselRef = useRef(null);
  const [show, setShow] = useState(2);
  const mslide = [{}, {}, {}, {}, {}];

  const get_list_of_films = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=fca43d4c1dc3416dd0309cde841c540a"
      );
      SetSlide_data(response.data.results);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the data.");
    }
  };

  useEffect(() => {
    get_list_of_films();
  }, []);
  useEffect(() => {
    if (Slide_data.length > 0) {
      const carouselElement = document.getElementById("carousel-example");

      const items = Slide_data.map((_, index) => ({
        position: index,
        el: document.getElementById(`carousel-item-${index}`),
      }));

      const options = {
        defaultPosition: show,
        interval: 3000,
        indicators: {
          activeClasses:
            "text-red-800 md:w-16 h-8 md:h-16 w-8 mb-3 md:text-6xl text-4xl btn bg-transparent border-none hover:bg-transparent",
          inactiveClasses:
            "text-sm text-black bg-white/50 backdrop-blur-[30px] md:w-12 h-6 md:h-12 w-6",
          items: Slide_data.map((_, index) => ({
            position: index,
            el: document.getElementById(`carousel-indicator-${index}`),
          })),
        },
      };

      carouselRef.current = new Carousel(carouselElement, items, options);
    }
    $("[id^='badge-']").addClass("hidden");
    $(`#badge-${show}`).removeClass("hidden");
    $(".badge").hover(
      function () {
        $(".information").addClass("opacity-0");
        $(".information").removeClass("opacity-100");
      },
      function () {
        $(".information").addClass("opacity-100");
        $(".information").removeClass("opacity-0");
      }
    );
  }, [Slide_data]);
  const setSlide = (index) => {
    $("[id^='badge-']").addClass("hidden");
    $(`#badge-${index}`).removeClass("hidden");
  };

  const totalGroups = Math.ceil(Slide_data.length / 5);
  const nextf = () => {
    if (show + 1 < 5) {
      carouselRef.current.next();
      setShow(show + 1);
      setSlide(currentGroup * 5 + show + 1);
    } else {
      carouselRef.current.next();
      setCurrentGroup((prev) => (prev + 1) % totalGroups);
      setSlide(
        currentGroup * 5 + show + 1 < 20 ? currentGroup * 5 + show + 1 : 0
      );
      setShow(0);
    }
  };
  const Pref = () => {
    if (show - 1 > -1) {
      carouselRef.current.prev();
      setShow(show - 1);
      setSlide(currentGroup * 5 + show - 1);
    } else {
      carouselRef.current.prev();
      setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups);
      setShow(4);
      setSlide(
        currentGroup * 5 + show - 1 > 0 ? currentGroup * 5 + show - 1 : 19
      );
    }
  };
  const renderIndicatorGroups = () => {
    const groups = [];
    for (let i = 0; i < Slide_data.length; i += 5) {
      const group = Slide_data.slice(i, i + 5);
      groups.push(
        <div
          key={`group-${i}`}
          className={`flex items-end space-x-5 ${
            Math.floor(i / 5) === currentGroup ? "flex" : "hidden"
          }`}
        >
          {group.map((item, index) => {
            return (
              <button
                id={`carousel-indicator-${i + index}`}
                key={index}
                onClick={() => {
                  setShow(index);
                  setSlide(i + index);
                }}
                type="button"
                className="rounded-full transition-all relative"
                aria-current={i + index === 0 ? true : false}
                aria-label={`Slide ${i + index + 1}`}
              >
                <div
                  id={`badge-${i + index}`}
                  className="badge flex justify-center bg-transparent border-none group/badge relative"
                >
                  <div className=" bg-red-500 backdrop-blur-[30px] p-2 rounded-full transition-all">
                    <div className="transition-all gap-2 flex justify-center group-hover/badge:opacity-100 -right-2 bottom-full pb-2 absolute duration-1000 opacity-0 items-center">
                      {mslide.map((_, index) => (
                        <button
                          id={`carousel-indicator-${index}-${item.id}`}
                          key={index}
                          type="button"
                          className="rounded-full w-8 h-8 transition-all relative cursor-pointer z-[999] active:text-red-500"
                          aria-current={index === 0 ? true : false}
                          aria-label={`Slide ${index + 1}`}
                        >
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {i + index + 1 < 10 ? `0${i + index + 1}` : i + index + 1}
              </button>
            );
          })}
        </div>
      );
    }
    return groups;
  };

  return (
    <div
      id="carousel-example"
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="relative h-full overflow-hidden rounded-lg">
        {Slide_data.map((item, index) => (
          <div
            id={`carousel-item-${index}`}
            key={index}
            className="hidden w-full h-full duration-700 ease-in-out"
          >
            <div className="absolute block z-50 w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <div className="absolute inset-0 flex md:flex-row flex-col-reverse  text-white">
                <div className="md:h-full md:w-1/3 rounded-t-2xl transition-all md:pb-0 pb-28 information duration-500 backdrop-blur-[30px] bg-black/20 px-6 md:px-0 md:pr-12 flex items-center justify-start">
                  <div className="md:w-1/3 hidden md:block"></div>
                  <div className="md:w-2/3 md:text-left text-center">
                    <div className="text-4xl">{item.title}</div>
                    <div className="mt-5">{item.overview}</div>
                    <div className="mt-5">
                      <Link
                        to={`/movie-site-react/Films/${item.id}`}
                        className="bg-black/50 px-4 backdrop-blur-[80px]  py-2 my-text rounded-full cursor-pointer"
                      >
                        Show more
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="h-full md:w-2/3"></div>
              </div>
            </div>
            <Imgcollention id={item.id} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 md:justify-end justify-center right-0 z-30 flex items-end md:-translate-x-12 rtl:space-x-reverse w-full">
        <button
          id="data-carousel-prev"
          type="button"
          onClick={() => Pref()}
          className="group z-30 flex md:h-16 md:w-16 w-8 h-8 cursor-pointer items-end justify-center focus:outline-none"
        >
          <span className="inline-flex md:h-12 h-6 md:w-12 w-6 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
            <svg
              className="h-4 w-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="hidden">Previous</span>
          </span>
        </button>
        {renderIndicatorGroups()}
        <button
          id="data-carousel-next"
          type="button"
          onClick={() => nextf()}
          className="group z-30 flex md:h-16 h-8 md:w-16 w-8 cursor-pointer items-end justify-center focus:outline-none"
        >
          <span className="inline-flex  md:h-12 h-6 md:w-12 w-6 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
            <svg
              className="h-4 w-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="hidden">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};
