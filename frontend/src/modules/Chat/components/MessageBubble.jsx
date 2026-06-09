import React, { useState } from 'react';
import { Edit, Copy, Check } from 'lucide-react';

const MessageBubble = ({ role, text, children }) => {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (isUser) {
    return (
      <div className="group flex flex-col items-end w-full mb-6">
        {/* Message Bubble */}
        <div className="bg-white/60 backdrop-blur-md text-gray-800 px-6 py-3.5 rounded-[2rem] rounded-tr-sm shadow-sm border border-white/50 max-w-[80%]">
          <p className="text-[15px] font-medium leading-relaxed break-words">{text}</p>
        </div>
        
        {/* Action Buttons (Copy/Edit) under the bubble */}
        <div className="flex items-center gap-1.5 mt-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={handleCopy}
            className="text-gray-400 hover:text-[#8C52FF] transition-colors p-1.5 rounded-full hover:bg-black/5 flex items-center justify-center shrink-0"
            title="Copy Message"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button 
            className="text-gray-400 hover:text-[#8C52FF] transition-colors p-1.5 rounded-full hover:bg-black/5 flex items-center justify-center shrink-0"
            title="Edit Message"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start w-full mb-6 gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A573FF] to-[#8C52FF] flex items-center justify-center shrink-0 shadow-md">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="white"/>
        </svg>
      </div>
      <div className="bg-white/80 backdrop-blur-xl text-gray-800 px-6 py-5 rounded-[2rem] rounded-tl-md shadow-[0_4px_24px_0_rgba(0,0,0,0.04)] border border-white max-w-[85%]">
        {children}
      </div>
    </div>
  );
};

export default MessageBubble;
