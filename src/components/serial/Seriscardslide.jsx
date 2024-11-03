import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import name_label from "../../imgs/name_label.svg";
import $ from "jquery";
import { Carousel, initTWE } from "tw-elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { Trailerbtn } from "../Trailerbtn";
import { Link } from "react-router-dom";
export const Seriscard = ({ item }) => {
  const [data, setData] = useState({});
  const [backgroundStyle, setbg] = useState({});
  const [logoUrl, setLogoUrl] = useState("");
  const sectionRefs = useRef([]);
  const [box, setbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const getfilms_data = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${item.id}?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const img = await axios.get(
        `https://api.themoviedb.org/3/tv/${item.id}/images?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const pngLogos = img.data.logos.filter(
        (logo) => logo.file_path.endsWith(".png") && logo.iso_639_1 === "en"
      );
      if (pngLogos.length > 0) {
        const firstPngLogo = `https://image.tmdb.org/t/p/original${pngLogos[0].file_path}`;
        setLogoUrl(firstPngLogo);
      } else {
        console.log("No PNG logos found");
      }
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the data.");
    }
  };

  useEffect(() => {
    getfilms_data();
  }, [item]);
  useEffect(() => {
    if (data.backdrop_path) {
      setbg({
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      });
    }
    initTWE({ Carousel });
  }, [data]);
  const scrollToIndex = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
      setCurrentIndex(index);
    }
  };
  return (
    <div
      className="relative px-0 overflow-y-auto inset-0 h-full flex flex-col-reverse md:flex-row justify-center text-white"
      style={backgroundStyle}
    >
      <div className="h-full md:block hidden w-1/12"></div>
      <div className="h-full hidden md:block md:w-5/12">
        <div className="h-full md:pt-24">
          <div className="md:w-1/2 w-full h-2/6 ">
            <img
              src={`https://image.tmdb.org/t/p/w500/${logoUrl}`}
              className="h-auto w-full"
              alt=""
            />
          </div>
          <div className="flex gap-2 text-sm mt-3">
            <div className="py-0.5 px-2">
              {data.first_air_date ? data.first_air_date.slice(0, 4) : "2013"}
            </div>
            <div className="py-0.5 px-2 border-white border rounded-md">
              {data.adult ? "18+" : "16+"}
            </div>
            <div className="py-0.5 px-2">IMDB {data.vote_average}/10</div>
            <div className="py-0.5 px-2">1hr 25min</div>
          </div>
          <div className="h-2/6 overflow-auto mt-2">{data.overview}</div>
        </div>
      </div>
      <div
        id={`charactrimg-${item.id}`}
        className="relative !h-full w-full pt-16 md:w-5/12"
        data-twe-carousel-init
        data-twe-ride="carousel"
      >
        <div
          className="absolute md:hidden block left-5 cursor-pointer  z-[999]"
          onClick={() => setbox(!box)}
        >
          {!box && (
            <FontAwesomeIcon className="hover:text-red-600" icon={faBars} />
          )}
          {box && <FontAwesomeIcon className="hover:text-red-600" icon={faX} />}
        </div>
        <div
          className={`absolute p-2 md:hidden block transition-all duration-1000 inset-0 ${
            box ? "w-full opacity-100" : "w-0 opacity-0"
          } bg-black/50 backdrop-blur-[50px] z-50`}
        >
          <div className="h-full pt-24">
            <div className="md:w-1/2 w-full h-2/6 ">
              <img
                src={`https://image.tmdb.org/t/p/w500/${logoUrl}`}
                className="md:h-auto h-full w-full"
                alt=""
              />
            </div>
            <div className="flex gap-2 text-sm mt-3">
              <div className="py-0.5 px-2">
                {data.first_air_date ? data.first_air_date.slice(0, 4) : "2013"}
              </div>
              <div className="py-0.5 px-2 border-white border rounded-md">
                {data.adult ? "18+" : "16+"}
              </div>
              <div className="py-0.5 px-2">IMDB {data.vote_average}/10</div>
              <div className="py-0.5 px-2">1hr 25min</div>
            </div>
            <div className="h-2/6 overflow-auto mt-2">{data.overview}</div>
          </div>
        </div>
        <div className="relative w-full h-full overflow-hidden after:clear-both after:block after:content-['']">
          {item.charactrimg.map((charImg, index) => (
            <div
              id={`charactrimg-item-${index}-${item.id}`}
              key={index}
              className="relative float-left -mr-[100%] h-full w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-fade
              data-twe-carousel-item
              {...(index === 0 ? { "data-twe-carousel-active": true } : {})}
            >
              <Link
                to={`/movie-site-react/person/${charImg.id}/${item.id}`}
                className="block w-full h-full cursor-pointer"
              >
                <div className="h-full w-full relative">
                  <img
                    src={require(`../../imgs/${charImg.img}`)}
                    alt="Second Image"
                    className="h-full w-2/3 png-affect image-with-shadow relative z-10"
                  />
                  <div className="h-16 w-1/2 text-end absolute top-1/4 left-1/3 z-0">
                    <img src={name_label} alt="" />
                    <div className="flex justify-end text-red-500 font-bold">
                      <div className="w-1/3">{charImg.name}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="h-full w-1/12 md:block hidden"></div>
    </div>
  );
};
