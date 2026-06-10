import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Brain, LogOut, ChevronRight, ArrowLeft, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const confirmLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-4 md:px-8 py-10 animate-fade-in relative z-10 overflow-y-auto">
      {/* Mobile Back Button */}
      <div className="mb-6 flex md:hidden">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-white/50 text-gray-700 hover:text-[#8C52FF] font-medium text-sm transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(140,82,255,0.08)] cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-[#8C52FF] transition-all duration-300 group-hover:-translate-x-0.5" />
          <span>Back to Chat</span>
        </button>
      </div>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A573FF] to-[#8C52FF] flex items-center justify-center shadow-lg border border-white/20">
          <Settings className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Settings</h1>
          <p className="text-gray-500 font-medium mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        
        {/* Memory Setting */}
        <button 
          onClick={() => navigate('/settings/memory')}
          className="group w-full flex items-center justify-between p-6 bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/60 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-[#8C52FF]/10 flex items-center justify-center border border-[#8C52FF]/20 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-6 h-6 text-[#8C52FF]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Nexora Memory</h3>
              <p className="text-[13px] text-gray-500 font-medium mt-0.5">Manage what the AI remembers about you</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#8C52FF] transition-colors group-hover:translate-x-1 duration-300" />
        </button>

        {/* Logout Setting */}
        <button 
          onClick={() => setShowLogoutPopup(true)}
          className="group w-full flex items-center justify-between p-6 bg-white/40 hover:bg-red-50/80 backdrop-blur-md border border-white/60 hover:border-red-100 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center border border-red-200 group-hover:scale-110 transition-transform duration-300">
              <LogOut className="w-6 h-6 text-red-500" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors">Sign Out</h3>
              <p className="text-[13px] text-gray-500 font-medium mt-0.5">Securely log out of your account</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors group-hover:translate-x-1 duration-300" />
        </button>

      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/10 backdrop-blur-sm animate-fade-in">
          <div className="bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-[2rem] w-full max-w-sm p-6 relative animate-slide-up">
            <button 
              onClick={() => setShowLogoutPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 border border-white/60 text-gray-600 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4 shadow-sm">
                <LogOut className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Out?</h3>
              <p className="text-gray-600 text-[15px] mb-8 leading-relaxed">
                Are you sure you want to sign out of your account? You will need to log in again to access Nexora AI.
              </p>

              <div className="flex w-full gap-3">
                <button 
                  onClick={() => setShowLogoutPopup(false)}
                  className="flex-1 py-3 px-4 rounded-2xl bg-white/50 hover:bg-white/80 border border-gray-200/50 text-gray-700 font-medium transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmLogout}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-md transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
