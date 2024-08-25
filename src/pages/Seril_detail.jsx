import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Trailerbtn } from "../components/Trailerbtn";
import { Box1 } from "../components/serial_detail/Box1";
import { Box2 } from "../components/serial_detail/Box2";
import { HeaderBox } from "../components/HeaderBox";
import { Normalslider } from "../components/Normalslider";
export const Seril_detail = () => {
  const { id } = useParams();
  const [film, setFilmData] = useState([]);
  const [filmbg, setFilmbgData] = useState([]);
  const [credits, setcredits] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [similar, setsimilar] = useState([]);
  const [video, setVideo] = useState(false);
  const sectionRefs = useRef([]);
  const [logoUrl, setLogoUrl] = useState("");
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const getFilmData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const bgs = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const Trailer = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const img = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const credit = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const similar = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=fca43d4c1dc3416dd0309cde841c540a`
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
      const trailers = Trailer.data.results.filter(
        (video) => video.type === "Trailer"
      );
      setFilmData(response.data);
      setsimilar(similar.data.results);
      setcredits(credit.data.cast);
      setFilmbgData(bgs.data);
      console.log(bgs.data)
      setTrailers(trailers);
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
              className="h-full md:block hidden w-full"
              alt="Backdrop 2"
            />
            <img
              src={`https://image.tmdb.org/t/p/w500/${filmbg.posters[2].file_path}`}
              className="h-full md:hidden block w-full"
              alt="Backdrop 2"
            />
          </div>
        )}
        <div className="inset-0 absolute z-3 md:text-left text-center bg-black/70 text-red-700 backdrop-blur-sm md:pl-12 md:px-[10%]">
          <Box2 credits={credits} film_id={id} />
        </div>
      </div>
      {trailers.length > 0 && (
        <div
          className="h-screen snap-center relative flex items-center justify-center bg-gray-200"
          ref={(el) => (sectionRefs.current[2] = el)}
        >
          {filmbg.backdrops && filmbg.backdrops.length > 1 && (
            <div className="absolute inset-0 z-0">
                         <img
              src={`https://image.tmdb.org/t/p/w500/${filmbg.backdrops[3].file_path}`}
              className="h-full md:block hidden w-full"
              alt="Backdrop 3"
            />
            <img
              src={`https://image.tmdb.org/t/p/w500/${filmbg.posters[3].file_path}`}
              className="h-full md:hidden block w-full"
              alt="Backdrop 3"
            />
            </div>
          )}
          <div className="inset-0 absolute z-3 flex flex-col justify-center items-center h-full w-full bg-black/30 text-white backdrop-blur-sm">
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
          </div>
        </div>
      )}
      {similar.length > 0 && (
        <div
          className="h-screen snap-center relative flex items-center justify-center bg-gray-200"
          ref={(el) => (sectionRefs.current[3] = el)}
        >
          {filmbg.backdrops && filmbg.backdrops.length > 1 && (
            <div className="absolute inset-0 z-0">
                          <img
              src={`https://image.tmdb.org/t/p/w500/${filmbg.backdrops[4].file_path}`}
              className="h-full md:block hidden w-full"
              alt="Backdrop 4"
            />
            <img
              src={`https://image.tmdb.org/t/p/w500/${filmbg.posters[4].file_path}`}
              className="h-full md:hidden block w-full"
              alt="Backdrop 4"
            />
            </div>
          )}
          <div className="inset-0 absolute z-3 flex flex-col justify-center items-center h-full w-full bg-black/30 text-white backdrop-blur-sm">
            <div className="w-full">
            <HeaderBox text="like this" />
            <Normalslider data={similar} />
            </div>
      
            {/* <HeaderBox text='this colection' />
          <Normalslider data={similar} /> */}
          </div>
        </div>
      )}
    </div>
  );
};
