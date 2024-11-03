import React from 'react'
import { Serialcard } from '../components/serial/Serialcard'
import { Serial_list } from '../components/serial/Serial_list'
export const Serial = () => {
  return (
    <div className='snap-mandatory snap-y overflow-y-auto h-screen bg-black'> 
      <div className='h-screen md:snap-center relative'>
        <Serialcard  />
      </div>
      <div className='h-screen md:snap-center'>
        <Serial_list/>
      </div>
    </div>
  )
}
