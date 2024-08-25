import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
export const Trailerbtn = ({ scroll, goindex }) => {
  const element = <FontAwesomeIcon icon={faPlay} />;
  const backgroundStyle = {
    background: `linear-gradient(to right, white, white,#0000ff00,#0000ff00)`,
  };

  return (
    <div>
      <div
        className="relative h-12 p-2 pl-12 cursor-pointer"
        onClick={() => scroll(goindex)}
      >
          <div className="flex justify-center items-center h-full w-full relative z-[4]">
            WATCH TRAILER
          </div>
        <div className="absolute inset-0 rounded-full z-0 overflow-hidden">
          <div className="w-full h-0.5 absolute top-0 right-0 left-0" style={backgroundStyle}></div>
          <div className="w-full h-0.5 absolute bottom-0 right-0 left-0" style={backgroundStyle}></div>
        </div>
        
        <div className="absolute h-14 bg-red-600 -left-5 w-14 rounded-full -top-1 -bottom-1 flex justify-center items-center">
          {element}
        </div>
      </div>
    </div>
  );
};
