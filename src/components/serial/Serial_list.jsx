import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HeaderBox } from "../HeaderBox";
import { Normalslider } from "../Normalslider";

export const Serial_list = () => {
  const [popular, Setpopular] = useState([]);
  const [top_rated, Settop_rated] = useState([]);

  const get_list_of_serials = async () => {
    try {
      const popular = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=fca43d4c1dc3416dd0309cde841c540a"
      );
      const top_rated = await axios.get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=fca43d4c1dc3416dd0309cde841c540a"
      );
      Setpopular(popular.data.results);
      Settop_rated(top_rated.data.results);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the data.");
    }
  };

  useEffect(() => {
    get_list_of_serials();
  }, []);



  return (
    <div className="h-full w-full flex flex-col justify-around">
      <div className="w-full">
        <HeaderBox text="popular" />
        <Normalslider data={popular} />
      </div>
      <div className="w-full mt-8">
        <HeaderBox text="top_rated" />
        <Normalslider data={top_rated} />
      </div>
    </div>
  );
};
