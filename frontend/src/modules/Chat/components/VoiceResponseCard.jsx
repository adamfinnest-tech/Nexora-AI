import React from 'react';
import { Play } from 'lucide-react';

const VoiceResponseCard = () => {
  return (
    <div className="bg-[#241A38] rounded-[1.5rem] px-5 py-4 flex items-center justify-between w-full max-w-[320px] shadow-lg">
      <div className="flex items-center gap-1 opacity-80">
        {/* Simple mock waveform */}
        {[3, 5, 8, 4, 6, 9, 7, 3, 5, 8, 4, 2, 6, 7, 5, 3, 8, 6, 4].map((height, i) => (
          <div 
            key={i} 
            className="w-[3px] bg-white rounded-full" 
            style={{ height: `${height * 3}px` }}
          ></div>
        ))}
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-white/80 text-xs font-medium tracking-wide">00:05</span>
        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors">
          <Play className="w-4 h-4 text-[#241A38] ml-0.5" fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default VoiceResponseCard;
