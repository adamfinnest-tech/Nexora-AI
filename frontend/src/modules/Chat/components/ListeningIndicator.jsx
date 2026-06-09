import React from 'react';
import sphere from '../../../assets/sphere.png';

const ListeningIndicator = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
        {/* Layered circular glows to prevent square shadows */}
        <div className="absolute w-20 h-20 bg-[#A573FF]/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute w-16 h-16 bg-[#8C52FF]/20 rounded-full blur-md"></div>
        
        <img 
          src={sphere} 
          alt="Listening" 
          className="w-24 h-24 object-cover z-10 animate-sphere-listening relative"
        />
      </div>
      {/* <p className="text-gray-500 font-medium text-sm tracking-wide mb-2">Listening...</p> */}
    </div>
  );
};

export default ListeningIndicator;
