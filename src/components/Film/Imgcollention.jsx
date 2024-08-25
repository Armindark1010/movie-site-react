import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Carousel } from 'flowbite';

export const Imgcollention = ({ id }) => {
    const [filmbg, setFilmbgData] = useState([]);
    const mslide = [{}, {}, {}, {}, {}]
    const carouselRef = useRef(null)
    

  const getFilmData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=fca43d4c1dc3416dd0309cde841c540a`);
      setFilmbgData(response.data.backdrops.slice(0, 5));
      console.log(response.data.backdrops.slice(0, 5))
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the movie data.');
    }
    };

const instanceOptions = {
  id: `carousel-collection-`+id,
  override: true
};
useEffect(() => {
  getFilmData()
}, [id]);
  useEffect(() => {
    if (filmbg.length > 0) {
        const carouselElement = document.getElementById(`carousel-collection-${id}`);

        const items = filmbg.map((_, index) => ({
            position: index,
            el: document.getElementById(`carousel-item-${index}-${id}`),
          }));
        
        const options = {
            defaultPosition: 0,
            interval: 3000,
        
            indicators: {
                activeClasses: 'bg-white dark:bg-gray-800',
                inactiveClasses:
                    'bg-white/20 backdrop-blur-[30px] dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
                items: [
                    {
                        position: 0,
                        el: document.getElementById(`carousel-indicator-0-${id}`),
                    },
                    {
                        position: 1,
                        el: document.getElementById(`carousel-indicator-1-${id}`),
                    },
                    {
                        position: 2,
                        el: document.getElementById(`carousel-indicator-2-${id}`),
                    },
                    {
                        position: 3,
                        el: document.getElementById(`carousel-indicator-3-${id}`),
                    },
                    {
                        position: 4,
                        el: document.getElementById(`carousel-indicator-4-${id}`),
                    },
                ],
            },
        };
  
      carouselRef.current = new Carousel(carouselElement, items, options);
    }
  }, [filmbg]);

  return (
    <div id={`carousel-collection-${id}`} className="relative w-full h-screen overflow-hidden">
      <div className="relative h-full overflow-hidden rounded-lg">
        {filmbg.map((item, index) => (
          <div id={`carousel-item-${index}-${id}`} key={index} className={`absolute inset-0 ${index === 0 ? 'block' : 'hidden'} w-full h-full duration-700 ease-in-out`}>
            <img src={`https://image.tmdb.org/t/p/w500${item.file_path}`} className="h-full w-full object-cover" alt="Movie backdrop" />
          </div>
        ))}
      </div>
    </div>
  );
};
