import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import { useParams, useNavigate } from "react-router-dom";
import { HeaderBox } from "../components/HeaderBox";
import { Normalslider } from "../components/Normalslider";
import { Imgcolection } from "../components/Imgcolection";
import { Imgbox } from "../components/Imgbox";
import { Loading } from "../components/Loading";
export const Person_detail = () => {
  const [personDetail, setPersonDetail] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videocont, setvideocoutn] = useState(0);
  const [imgcount, setimgcount] = useState(0);
  const [imgs, setimgs] = useState(0);
  const [movies, setmovies] = useState([]);
  const [serials, setserials] = useState([]);
  const { id, film_id } = useParams();
  const navigate = useNavigate();

  const getFilmData = async () => {
    setLoading(true);
    try {
      const personResponse = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const movie = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const serial = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      const imgs = await axios.get(
        `
https://api.themoviedb.org/3/person/${id}/images?api_key=fca43d4c1dc3416dd0309cde841c540a`
      );
      setPersonDetail(personResponse.data);
      setimgcount(imgs.data.profiles.length);
      setmovies(movie.data.cast);
      setserials(serial.data.cast);
      setimgs(imgs.data.profiles);
      if (film_id) {
        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${film_id}/videos?api_key=fca43d4c1dc3416dd0309cde841c540a`
        );
        setvideocoutn(trailerResponse.data.results.length);
        const trailers = trailerResponse.data.results.filter(
          (video) => video.type === "Trailer"
        );
        setTrailers(trailers);
      }
    } catch (error) {
      console.error("Error:", error.response?.status);
      setError("An error occurred. Please try again later.");
      if (error.response && error.response.status === 404) {
        navigate("/404");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilmData();
  }, [id, film_id]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1, // پخش خودکار
      controls: 0, // حذف کنترل‌ها
      modestbranding: 0, // حذف لوگوی YouTube
      showinfo: 0, // حذف اطلاعات ویدئو
      rel: 0, // عدم نمایش ویدئوهای مرتبط
      fs: 0, // حذف دکمه fullscreen
      iv_load_policy: 3, // حذف برچسب‌های ویدئو
    },
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="md:px-12 px-5 bg-black text-white snap-mandatory snap-y overflow-y-auto h-screen">
      <div className="h-screen pt-16 snap-center">
        {personDetail && (
          <>
            <div className="h-[10%]">
              <div className="text-3xl font-bold">{personDetail.name}</div>
              <div className="text-xs text-slate-600 font-bold">
                {personDetail.known_for_department}
              </div>
            </div>
            <div className="md:flex h-[50%]">
              <div className="md:w-[80%] flex">
                <div className="md:w-[20%] w-[40%] rounded-md overflow-hidden">
                  <Imgbox
                    url={`https://image.tmdb.org/t/p/w500${personDetail.profile_path}`}
                  />
                </div>
                <div className="md:w-[60%] w-[80%] mx-1">
                  {trailers.length > 0 && (
                    <YouTube
                      className="h-full w-full"
                      videoId={trailers[0].key}
                      opts={opts}
                      onReady={(event) => event.target.playVideo()}
                    />
                  )}
                </div>
              </div>
              <div className="md:w-[20%] md:block flex gap-2 md:mt-0 mt-2">
                <div className="bg-white/20 h-1/2 w-full flex justify-center items-center mb-2 rounded-md cursor-pointer">
                  <div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="ipc-icon ipc-icon--video-library ipc-icon--inline sc-e27b52c0-0 jtHZUv"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="presentation"
                      >
                        <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
                      </svg>
                    </div>
                    <div className="text-center">{videocont}</div>
                  </div>
                </div>
                <div className="bg-white/20 h-1/2 w-full flex justify-center items-center rounded-md cursor-pointer">
                  <div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="ipc-icon ipc-icon--collections ipc-icon--inline sc-e27b52c0-0 jtHZUv"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="presentation"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
                      </svg>
                    </div>
                    <div className="text-center">{imgcount}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[40%] pt-5 flex">
              <div className="w-2/3 h-[90%] overflow-y-auto">
                <div>{personDetail.biography}</div>
                <div className="mt-1">
                  <hr />
                </div>
              </div>
              <div className="w-1/3 pl-2">
                <div>Born in {personDetail.place_of_birth} and</div>
                <div>Born {personDetail.birthday}</div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="h-screen snap-center py-16 flex justify-center items-center flex-col gap-10">
        <div className="h-1/2 w-full">
          <HeaderBox text="movies" />
          <Normalslider data={movies} />
        </div>
        <div className="h-1/2 w-full">
          <HeaderBox text="serials" />
          <Normalslider data={serials} />
        </div>
      </div>
      <div className="h-screen flex items-center snap-center">
        <div className="h-[70%] w-full">
          <HeaderBox text="character imgs" />
          <Imgcolection imgs={imgs} />
        </div>
      </div>
    </div>
  );
};
