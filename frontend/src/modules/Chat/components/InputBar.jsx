import React, { useState, useRef, useEffect } from 'react';
import { Plus, Mic, Send, Square } from 'lucide-react';

const InputBar = ({ isListening, setIsListening, onSendMessage, disabled, onStop }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [text]);

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim() && onSendMessage) {
        onSendMessage(text);
        setText('');
      }
    }
  };

  const handleSend = () => {
    if (disabled) return;
    if (text.trim() && onSendMessage) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <div className="relative w-full shrink-0 mt-2 transition-opacity duration-300 z-10">
      {/* Animated Feathered Glow Layer */}
      <div className="absolute -inset-[2px] bg-[linear-gradient(90deg,#8C52FF,#3B82F6,#A573FF,#8B5CF6,#8C52FF)] bg-[length:200%_auto] animate-gradient opacity-60 blur-md rounded-[2.5rem]" />
      
      {/* Inner Content (Glassmorphism) */}
      <div className="relative w-full bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] rounded-[2.5rem] py-1.5 px-2 flex items-end justify-between">
      
      <button 
        className="w-10 h-10 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors text-gray-500 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        <Plus className="w-5 h-5" />
      </button>
 
      <div className="relative flex-1 flex items-center">
        {!text && (
          <div className="absolute inset-y-0 left-0 px-4 py-2 pointer-events-none flex items-center">
            {disabled ? (
              <span className="text-[#8C52FF] font-medium text-[15px] animate-typing-loop">Waiting for response...</span>
            ) : (
              <span className="text-gray-400 text-[15px] animate-typing-loop">Research a company, analyze a market, compare competitors, or generate business insights...</span>
            )}
          </div>
        )}
        <textarea 
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="" 
          rows={1}
          className="w-full relative z-10 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 px-4 py-2 text-[15px] disabled:bg-transparent disabled:cursor-not-allowed resize-none overflow-y-auto no-scrollbar"
          disabled={disabled || isListening}
        />
      </div>
 
      <div className="relative">
        {disabled ? (
          <button 
            onClick={onStop}
            title="Stop generation"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-500 hover:opacity-90 flex items-center justify-center transition-all shadow-md shrink-0"
          >
            <Square className="w-3.5 h-3.5 text-white fill-current" />
          </button>
        ) : text.trim() ? (
          <button 
            onClick={handleSend}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A573FF] to-[#8C52FF] hover:opacity-90 flex items-center justify-center transition-all shadow-md shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        ) : (
          <button 
            onClick={() => !disabled && setIsListening(!isListening)}
            className={`w-10 h-10 rounded-full bg-gradient-to-br from-[#A573FF] to-[#8C52FF] hover:opacity-90 flex items-center justify-center transition-all shadow-md shrink-0 ${isListening ? 'ring-4 ring-[#A573FF]/40 shadow-[0_0_15px_rgba(165,115,255,0.8)] animate-pulse' : ''}`}
          >
            <Mic className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default InputBar;
