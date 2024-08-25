import React from 'react';
import { Filmcard } from '../components/Filmcard';
import { Box2 } from '../components/Film/Box2';
import './Home.css'
export const Home = () => {
    return (
        <div>
            <div className='bg-green-500 relative' style={{ height: '80vh' }}>
                <Filmcard text="test1" />
                {/* <Filmcard text="test2" /> */}
            </div>
            <div className='fixed bg-black z-50 bottom-0 right-0 left-0 box2 flex h-[25vh] shadow-[0px 0px 100px 70px black]'>
                <Box2 />
            </div>
        </div>
    );
};
