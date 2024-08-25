import React from 'react'
import { Imgbox } from './Imgbox';
export const Imgcolection = ({ imgs }) => {
  return (
        <div className='h-full w-full'>
          <div className='flex h-1/2 gap-5 justify-center'>
              {imgs?.length >= 1 && (
                  <div className={`${imgs[0].height > imgs[0].width ? 'w-[20%]' : 'w-[20%]'}`}>
                      <Imgbox url={`https://image.tmdb.org/t/p/w500${imgs[0].file_path}`} />
                  </div>
              )}
             {imgs?.length >= 2 && (
                  <div className={`${imgs[1].height > imgs[1].width ? 'w-[30%]' : 'w-[50%]'}`}>
                      <Imgbox url={`https://image.tmdb.org/t/p/w500${imgs[1].file_path}`} />
                  </div>
              )}
             {imgs?.length >= 3 && (
                  <div className={`${imgs[2].height > imgs[2].width ? 'w-[20%]' : 'w-[30%]'}`}>
                        <Imgbox url={`https://image.tmdb.org/t/p/w500${imgs[2].file_path}`} />
                  </div>
                  
              )}
          </div>
          <div className='flex h-1/2 pt-2 gap-5 justify-center'>
          {imgs?.length >= 4 && (
                  <div className={`${imgs[3].height > imgs[0].width ? 'w-[20%]' : 'w-[20%]'}`}>
                        <Imgbox url={`https://image.tmdb.org/t/p/w500${imgs[3].file_path}`} />
                  </div>
            )}
          {imgs?.length >= 5 && (
                  <div className={`${imgs[4].height > imgs[1].width ? 'w-[30%]' : 'w-[50%]'}`}>
                        <Imgbox url={`https://image.tmdb.org/t/p/w500${imgs[4].file_path}`} />
                  </div>
            )}
          {imgs?.length >= 6 && (
              <div className={`${imgs[5].height > imgs[2].width ? 'w-[20%]' : 'w-[30%]'} relative cursor-pointer`}>
                    <Imgbox url={`https://image.tmdb.org/t/p/w500${imgs[5].file_path}`} />
                      {imgs?.length > 6 && (
                      <div className='absolute inset-0 bg-black/50 text-5xl flex justify-center items-center'>
                          {imgs.length - 6}+
                      </div>
              )}
          </div>
            )}
              
          </div>
        </div>
  )
}
