import React from 'react';
import { Trash2 } from 'lucide-react';

const RecentChatItem = ({ icon, title, isLast, isActive, onClick, onDelete }) => {
  return (
    <div className="px-2">
      <div 
        onClick={onClick}
        className={`group flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-white/40 rounded-[2rem] transition-colors ${!isLast ? 'border-b border-black/5' : ''} ${isActive ? 'bg-white/60 shadow-sm' : ''}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 flex items-center justify-center bg-transparent shrink-0">
            {icon}
          </div>
          <p className={`font-medium text-[15px] truncate ${isActive ? 'text-black' : 'text-[#1a1a1a]'}`}>{title}</p>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete();
          }}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
          title="Delete Chat"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default RecentChatItem;
