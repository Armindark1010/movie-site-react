import React from 'react'
import { HeaderBox } from '../HeaderBox'
import { Link } from 'react-router-dom'
export const Box2 = ({ credits,film_id }) => {
  
  return (
    <div className='flex w-full justify-center items-center md:px-12 h-full'>
      <div className='h-2/3 mt-16 w-full text-white'>
        <div className='h-[10%]'>
                  <HeaderBox text="Top Cast" />
        </div>
      <div className='w-full h-[90%] overflow-x-auto px-2 flex flex-col-reverse md:flex-wrap justify-center'>
      {credits.map((item) => (
        <Link to={`/movie-site/person/${item.id}/${film_id}`} class="avatar group/item gap-2 items-center cursor-pointer">
            <div class="ring-error ring-offset-base-100 w-16 rounded-full ring ring-offset-2 group-hover/item:ring-primary">
              <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} />
            </div>
            <div className='ml-4 h-32 w-full !flex !flex-col !justify-center'>
                <div>{item.original_name}</div>
                <div>{item.character}</div>
            </div>
        </Link>
          ))}
      </div>       
      </div>


    </div>

  )
}
