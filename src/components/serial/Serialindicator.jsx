import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
export const Serialindicator = ({ id, index, setid }) => {
  const element = <FontAwesomeIcon icon={faPlay} />;
  const [bg, setbg] = useState("");
  const getbg = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      setbg(response.data.backdrop_path);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the data.");
    }
  };

  useEffect(() => {
    getbg();
  }, [id]);
  return (
    <button
      id={`carousel-indicator-serial-${index}`}
      type="button"
      className="w-full h-full py-2 rounded-full relative"
      aria-current={index == 0 ? true : false}
      aria-label={`Slide ${index}`}
      onClick={() => setid(id)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${bg}`}
        alt=""
        className="h-full w-full"
      />
      <div className="opacity-0 absolute inset-0">
        <span className="text-white p-2 h-8 w-8 rounded-full bg-white/20 backdrop-blur-[20px]">
          {element}
        </span>
      </div>
    </button>
  );
};
