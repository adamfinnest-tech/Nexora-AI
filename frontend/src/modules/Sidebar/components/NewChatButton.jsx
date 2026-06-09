import React from 'react';
import { SquarePen } from 'lucide-react';

const NewChatButton = ({ onSelectChat }) => {
  return (
    <button 
      onClick={() => onSelectChat && onSelectChat(null)}
      className="flex items-center justify-center gap-2 w-full px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-[#BE8AEE] to-[#8E6FD6] shadow-sm hover:opacity-90 transition-opacity"
    >
      <SquarePen />
      New Chat
    </button>
  );
};

export default NewChatButton;
