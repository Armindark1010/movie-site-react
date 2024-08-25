import React from 'react'
import { Link } from "react-router-dom";

export const HeaderBox = ({text,go}) => {
  return (
    <div className='w-full'>
      {go?.length > 0 ? (
        <Link to={go} className="cursor-pointer group/HeaderBox  text-white hover:text-red-500 flex md:h-10 h-8 md:text-4xl text-2xl">
        <div className='bg-red-500 w-2 h-full group-hover/HeaderBox:bg-blue-600'>
          </div>
          <div className='ml-3'>
              {text}
          </div>       
        </Link>
      ) : (
        <div  className="cursor-pointer group/HeaderBox  text-white hover:text-red-500 flex md:h-10 h-8 md:text-4xl text-2xl">
        <div className='bg-red-500 w-2 h-full group-hover/HeaderBox:bg-blue-600'>
          </div>
          <div className='ml-3'>
              {text}
          </div>       
        </div>
      )}
        
          
        
    </div>
  )
}
