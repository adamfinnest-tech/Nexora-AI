import React from 'react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const getInitials = (name) => {
  const cleanName = name || 'Alex';
  const parts = cleanName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const ProfileFooter = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-4 mb-6 bg-white/80 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] rounded-[2rem] py-1.5 px-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center bg-gradient-to-tr from-[#BE8AEE] to-[#8E6FD6] text-white font-semibold text-[16px] shadow-sm select-none shrink-0 overflow-hidden">
            {user?.picture ? (
              <img src={user.picture} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              getInitials(user?.name)
            )}
          </div>
          {/* <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-[#A573FF] rounded-full border-[3px] border-white flex items-center justify-center shadow-sm">
            <span className="text-white text-[11px] font-bold">2</span>
          </div> */}
        </div>
        <div className="flex flex-col">
          <p className="text-[#1a1a1a] font-medium text-[15px] leading-tight">{user?.name || 'Alex'}</p>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/settings')}
        className="w-10 h-10 rounded-full hover:bg-white/80 flex items-center justify-center transition-colors text-gray-500 mr-2"
      >
        <Settings className="w-[22px] h-[22px]" strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default ProfileFooter;
