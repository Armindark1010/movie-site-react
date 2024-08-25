import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Searchbox = ({ boxRef, isopen,togglebox }) => { 
  const [TaskValue, setTaskValue] = useState('');
  const [data, setData] = useState([]);

  const Search = async (value) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=fca43d4c1dc3416dd0309cde841c540a&query=${value}`);
      setData(response.data.results);

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the movie data.');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTaskValue(value);
    Search(value);
  }

  const calculateHeight = () => {
    if (data.length === 0) {
      return 'h-[100px]';
    } else if (data.length <= 4) {
      return `h-[${data.length * 5}%]`;
    } else {
      return 'h-[500px]'; // حداکثر ارتفاع
    }
  };
  const calculateHeights = () => {
    if (data.length === 0) {
      return 'h-[0px]';
    } else if (data.length <= 4) {
      return `h-[${data.length * 5}%]`;
    } else {
      return 'h-[400px]'; // حداکثر ارتفاع
    }
  };

  return (
    <div 
      ref={boxRef} 
      className={`h-0 left-5 right-5 bg-white/20 backdrop-blur-[30px] rounded-2xl opacity-0 duration-1000 transition-all absolute overflow-hidden ${isopen ? `opacity-100 ${calculateHeight()}` : 'opacity-0 h-0'}`}
    >
      <div>Search</div>
      <div>
        <input 
          type="text" 
          onChange={handleInputChange} 
          value={TaskValue} 
          className='w-11/12 mx-auto rounded-md h-10 bg-black/70 text-white backdrop-blur-[30px] border-none outline-none' 
        />
      </div>
      <div className={` mt-2 overflow-y-auto w-11/12 mx-3 rounded-md transition-all duration-1000 ${calculateHeights()}`}>
        {data.length > 0 && (
          <div>
            {data.map((item, index) => (
              <Link to={`/movie-site/${item.media_type == 'tv' ? 'Serial/' : 'Films/'} ${item.id}`} key={index} className='inline-block h-[192px] px-2 relative cursor-pointer w-1/2' onClick={()=>togglebox()}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.original_name || item.original_title}
                  className="h-full w-full"
                />
                <div className="absolute h-12 bottom-0 left-2 text-xs right-2 flex justify-center items-center bg-black/50 text-white backdrop-blur-[30px]">
                  {item.original_name?.length > 0 ? item.original_name : item.original_title}
                </div>
              </Link>
            ))}
          </div>
        )}
        {data.length == 0 && (
          <div>we cant find this film</div>
        )}
      </div>
    </div>
  );
}
