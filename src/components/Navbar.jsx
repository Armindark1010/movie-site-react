import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo_icon from '../imgs/logo-icon.png';
import logo_text from '../imgs/logo-text.png';
import { Searchbox } from './Searchbox';
import { useRef,useState,useEffect } from 'react';
export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isopen, setisopen] = useState(false)
  const boxRef = useRef(null)
  const togglebox = () => {
    setisopen(!isopen)
  }
  const handleClicktside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setisopen(false)
    }
  }
    useEffect(() => {
      document.addEventListener('mousedown', handleClicktside);
      return () => {
        document.removeEventListener('mousedown', handleClicktside);
      }
      }, []);
  const getLinkClass = (path) => {
    return currentPath.startsWith(path) ? 'text-black' : 'text-gray-400';
  };
  return (
    <div className='flex justify-center border-none fixed z-50 top-0 left-0 right-0'>
      <div className='w-1/3 md:block hidden'></div>
      <div className="flex items-center justify-between md:w-1/3 w-10/12 relative">
        <div>
        <Link to="/" className={`font-bold md:text-2xl text-base ${currentPath === '/' || currentPath.startsWith('/Films') ? 'text-black' : 'text-gray-400'}`}>
  Films
        </Link>
        </div>
        <div>
          <Link to="/Serial" className={`font-bold md:text-2xl text-base ${getLinkClass('/Serial')}`}>
            Serial
          </Link>
        </div>
        <div className='w-16 h-16 border relative border-none overflow-hidden -z-10 md:shadow-[0px_0px_800px_130px_#520000] shadow-[0px_0px_800px_70px_#520000]'>
          <img src={logo_icon} alt="Logo Icon" className='absolute inset-0' />
          <img src={logo_text} alt="Logo Text" className='absolute right-0 left-0 top-1/3 z-10' />
          <div className='shadow-[0px_0px_800px_95px_#520000] z-0'></div>
        </div>
        <div>
          <button className='font-bold md:text-2xl text-base text-black'>
            <label htmlFor="searchbox" className='cursor-pointer'  onClick={() => togglebox()}>search</label>
              <Searchbox boxRef={boxRef} isopen={isopen} togglebox={togglebox} />
          </button>
        </div>
        <div>
          <Link to="/Kids" className={`font-bold md:text-2xl text-base ${getLinkClass('/Kids')}`}>
            Kids
          </Link>
        </div>
      </div>
      <div className='w-1/3 md:block hidden flex justify-end items-center text-black'>
        <img src={logo_icon} alt="Logo Icon" className='w-5 h-5' />
      </div>
    </div>
  );
};
