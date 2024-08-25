import { Carousel } from "flowbite";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HeaderBox } from "../HeaderBox";
export const Box3 = ({ id }) => {
  const [trailer, setVideo] = useState([]);
  const carouselRef = useRef(null);

  const getVideos = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=fca43d4c1dc3416dd0309cde841c540a`
        );
        const trailers = response.data.results.filter(video => video.type === 'Trailer');
        setVideo(trailers);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the data.");
    }
  };

  useEffect(() => {
    getVideos();
  }, [id]);

  return (
      <div className="inset-0 absolute z-3 flex flex-col justify-center items-center h-full w-full bg-black/30 text-white backdrop-blur-sm">
    {trailer.length > 0 && (
              <div className='md:h-[80vh] h-1/2 w-10/12'>
                  <div className="mb-2">
                                <HeaderBox text="trailer" />
                  </div>

        <iframe
          className='h-full w-full'
          src={`https://www.youtube.com/embed/${trailer[0].key}`}
          title={trailer[0].name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )}
  </div>
  );
};
