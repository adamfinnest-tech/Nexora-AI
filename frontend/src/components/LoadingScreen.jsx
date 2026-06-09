import React from 'react';
import sphere from '../assets/sphere.png';

const LoadingScreen = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F3F0FF] bg-[radial-gradient(at_0%_0%,_#FCE7EC_0px,_transparent_50%),radial-gradient(at_100%_0%,_#E6D8FA_0px,_transparent_50%),radial-gradient(at_0%_100%,_#CDE4FF_0px,_transparent_50%),radial-gradient(at_100%_100%,_#ECC2DF_0px,_transparent_50%)]">
      
      {/* Background Decorative Spheres */}
      <img src={sphere} alt="" className="absolute top-[15%] right-[25%] w-24 h-24 object-cover blur-[2px] opacity-70 animate-[float_6s_ease-in-out_infinite]" />
      <img src={sphere} alt="" className="absolute bottom-[20%] left-[20%] w-32 h-32 object-cover blur-md opacity-50 animate-[float_8s_ease-in-out_infinite_reverse]" />
      
      {/* Central Glassmorphism Card */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-[2.5rem] p-12">
        <div className="w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6] via-[#4F46E5] to-[#8B5CF6] rounded-full animate-pulse blur-xl opacity-60"></div>
          <img src={sphere} alt="Loading..." className="w-full h-full object-cover rounded-full animate-[spin_8s_linear_infinite] relative z-10" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1b1238] via-[#3c2a63] to-[#1b1238] bg-clip-text text-transparent animate-pulse">
          Starting Nexora AI
        </h2>
        {/* <div className="flex items-center gap-1.5 mt-4">
          <span className="w-2.5 h-2.5 bg-[#8C52FF] rounded-full animate-bounce"></span>
          <span className="w-2.5 h-2.5 bg-[#8C52FF] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
          <span className="w-2.5 h-2.5 bg-[#8C52FF] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
        </div> */}
      </div>
    </div>
  );
};

export default LoadingScreen;
