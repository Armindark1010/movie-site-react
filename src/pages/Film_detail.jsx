// About.js
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Trailerbtn } from "../components/Trailerbtn";
import { Box1 } from "../components/serial_detail/Box1";
import { Box2 } from "../components/serial_detail/Box2";
import { Normalslider } from "../components/Normalslider";
import { HeaderBox } from "../components/HeaderBox";
import { Link } from "react-router-dom";
import { data } from "jquery";
export const Film_detail = () => {
  const { id } = useParams();
  const [film, setFilmData] = useState([]);
  const [filmbg, setFilmbgData] = useState([]);
  const [credits, setcredits] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [similar, setsimilar] = useState([]);
  const [collection, setcollection] = useState([]);
  const [video, setVideo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRefs = useRef([]);
  const [logoUrl, setLogoUrl] = useState("");
  const navigate = useNavigate();

  const getFilmData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const bgs = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const Trailer = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const img = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const credit = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const similar = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );

      // دریافت اطلاعات کالکشن
      if (response.data.belongs_to_collection) {
        const collection = await axios.get(
          `https://api.themoviedb.org/3/collection/${response.data.belongs_to_collection.id}?api_key=fca43d4c1dc3416dd0309cde841c540a`
        );
        setcollection(collection.data.parts);
        console.log(collection.data.parts);
        console.log(response.data.poster_path);
      }

      const pngLogos = img.data.logos.filter(
        (logo) => logo.file_path.endsWith(".png") && logo.iso_639_1 === "en"
      );
      if (pngLogos.length > 0) {
        const firstPngLogo = `https://image.tmdb.org/t/p/original${pngLogos[0].file_path}`;
        setLogoUrl(firstPngLogo);
      } else {
        console.log("No PNG logos found");
      }
      const trailers = Trailer.data.results.filter(
        (video) => video.type === "Trailer"
      );
      setFilmData(response.data);
      setcredits(credit.data.cast);
      setFilmbgData(bgs.data);
      setTrailers(trailers);
      setsimilar(similar.data.results);

      if (trailers.length > 0) {
        setVideo(true);
      } else {
        setVideo(false);
      }
    } catch (error) {
      console.error("Error:", error.response.status);
      if (error.response && error.response.status === 404) {
        navigate("/404");
      }
    }
  };

  useEffect(() => {
    getFilmData();
  }, [id]);
  const scrollToIndex = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  return (
    <div className="snap-mandatory snap-y overflow-y-auto h-screen">
      <div className="h-screen snap-center">
        <Box1
          data={film}
          logoUrl={logoUrl}
          scroll={scrollToIndex}
          goindex={2}
        />
      </div>
      <div
        className="h-screen snap-center relative flex items-center justify-center bg-gray-200"
        ref={(el) => (sectionRefs.current[1] = el)}
      >
        {filmbg.backdrops && filmbg.backdrops.length > 0 && (
          <div className="absolute inset-0 z-0">
            <img
              src={`https://image.tmdb.org/t/p/w500/${filmbg.backdrops[2].file_path}`}
              className="h-full w-full"
              alt="Backdrop 2"
            />
          </div>
        )}
        <div className="inset-0 absolute z-3 flex flex-col md:text-left text-center justify-center items-center bg-black/70 text-red-700 backdrop-blur-sm md:pl-12 px-2 md:px-[10%]">
          <Box2 credits={credits} />
        </div>
      </div>
      <div
        className="h-screen snap-center relative flex items-center justify-center bg-gray-200"
        ref={(el) => (sectionRefs.current[2] = el)}
      >
        {filmbg.backdrops && filmbg.backdrops.length > 1 && (
          <div className="absolute inset-0 z-0">
            <img
              src={`https://image.tmdb.org/t/p/w500/${filmbg.backdrops[3].file_path}`}
              className="h-full w-full"
              alt="Backdrop 3"
            />
          </div>
        )}
        <div className="inset-0 absolute z-3 flex flex-col justify-center items-center h-full w-full bg-black/30 text-white backdrop-blur-sm">
          {trailers.length > 0 && (
            <div className="md:h-[80vh] h-1/2 w-10/12">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${trailers[0].key}`}
                title={trailers[0].name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
      <div
        className="h-screen snap-center relative flex items-center justify-center bg-gray-200"
        ref={(el) => (sectionRefs.current[3] = el)}
      >
        {filmbg.backdrops && filmbg.backdrops.length > 1 && (
          <div className="absolute inset-0 z-0">
            <img
              src={`https://image.tmdb.org/t/p/w500/${filmbg.backdrops[4].file_path}`}
              className="h-full w-full"
              alt="Backdrop 3"
            />
          </div>
        )}
        <div className="inset-0 absolute z-3 flex flex-col justify-center items-center h-full w-full bg-black/30 text-white backdrop-blur-sm">
          <div className="w-full ">
          <HeaderBox text="like this" />
          <Normalslider data={similar} />
          </div>

        </div>
      </div>
      <div
        className="h-screen snap-center relative flex items-center justify-center bg-gray-200"
        ref={(el) => (sectionRefs.current[4] = el)}
      >
        {filmbg.backdrops && filmbg.backdrops.length > 1 && (
          <div className="absolute inset-0 z-0">
            <img
              src={`https://image.tmdb.org/t/p/w500/${filmbg.backdrops[5].file_path}`}
              className="h-full w-full"
              alt="Backdrop 3"
            />
          </div>
        )}
        <div className="inset-0 absolute z-3 h-full w-full bg-black/30 text-white backdrop-blur-sm pt-16">
          <HeaderBox text="collection" />
          {film.belongs_to_collection && (
            <div className="flex justify-center items-center h-64">
              <img
                src={`https://image.tmdb.org/t/p/w500${film.belongs_to_collection.poster_path}`}
                className="h-full w-auto"
                alt=""
              />
            </div>
          )}
          {collection.length > 5 && (
      <Normalslider data={collection} />
    )}
    {collection.length <= 5 && (
      <div className="flex justify-center gap-2 items-center mt-3">
              {collection.map((item, index) => (
            <Link key={index} to={`/movie-site/Films/${item.id}`} className="w-1/5 h-64 cursor-pointer relative">

<img
                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                className="h-full w-auto"
                alt=""
            />
                <div className="absolute h-12 bottom-0 left-0 text-xs right-0 flex justify-center items-center bg-black/50 text-white backdrop-blur-[30px]">
                  {item.original_name?.length > 0 ? item.original_name : item.original_title}
                </div>
            </Link>
       ))}
      </div>
    )}
        </div>
      </div>
    </div>
  );
};
