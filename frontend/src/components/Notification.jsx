import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Notification = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  return (
    <div className="fixed top-6 right-6 z-[200] animate-slide-up flex items-center gap-3 px-4 py-3 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl min-w-[280px]">
      <div className="shrink-0 bg-white shadow-sm p-1.5 rounded-full border border-gray-100">
        {icons[type] || icons.info}
      </div>
      <p className="text-[#1a1a1a] text-[15px] font-medium flex-1 ml-1 mr-4">{message}</p>
      <button 
        onClick={onClose}
        className="shrink-0 p-1.5 hover:bg-black/5 rounded-full transition-colors text-gray-500"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Notification;
