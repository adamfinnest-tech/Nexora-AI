import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import sphere from '../../../assets/sphere.png';

const ChatHeader = ({ onMenuClick }) => {
  return (
    <div className="w-full bg-white/50 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.03)] rounded-[2.5rem] p-2 flex items-center justify-between shrink-0 mb-6">
      <div className="flex items-center gap-3">
        {/* Back Button - Solid White Circular Card */}
        {/* <button className="w-12 h-12 rounded-full bg-white hover:bg-white/95 flex items-center justify-center transition-all text-gray-800 shadow-sm border border-white/50 shrink-0">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button> */}

        {/* AI Profile Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
            <img src={sphere} alt="Nexora AI" className="w-full h-full object-cover animate-[spin_25s_linear_infinite]" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[#1a1a1a] font-semibold text-[15px] leading-tight">Nexora AI — Your Business Copilot</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]"></span>
              <span className="text-gray-500 text-[11px] font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Button - Solid White Circular Card */}
      <button 
        onClick={onMenuClick}
        className="md:hidden w-12 h-12 rounded-full bg-white hover:bg-white/95 flex items-center justify-center transition-all text-gray-800 shadow-sm border border-white/50 shrink-0"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default ChatHeader;
