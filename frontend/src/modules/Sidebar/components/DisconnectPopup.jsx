import React from 'react';
import { X, AlertCircle } from 'lucide-react';

const DisconnectPopup = ({ isOpen, onClose, onDisconnect, appName }) => {
  if (!isOpen) return null;

  const displayName = appName === 'gmail' ? 'Gmail' : appName === 'googlecalendar' ? 'Google Calendar' : appName;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/10 backdrop-blur-sm animate-fade-in">
      <div className="bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-[2rem] w-full max-w-sm p-6 relative animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 border border-white/60 text-gray-600 transition-colors shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4 shadow-sm">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Disconnect {displayName}?</h3>
          <p className="text-gray-600 text-[15px] mb-8 leading-relaxed">
            Are you sure you want to disconnect your {displayName} account? Nexora AI will no longer have access.
          </p>

          <div className="flex w-full gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl bg-white/50 hover:bg-white/80 border border-gray-200/50 text-gray-700 font-medium transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onDisconnect(appName);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-md transition-all"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisconnectPopup;
