import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

const getInitials = (name) => {
  const cleanName = name || 'Alex';
  const parts = cleanName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const SidebarHeader = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#BE8AEE] to-[#8E6FD6] text-white font-semibold text-[15px] shadow-sm select-none shrink-0 overflow-hidden">
          {user?.picture ? (
            <img src={user.picture} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            getInitials(user?.name)
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 text-[13px] font-medium leading-tight">Hi, {user?.name || 'Alex'}</p>
          <h2 className="text-[#1a1a1a] font-medium text-[15px] leading-tight mt-0.5">Welcome Back</h2>
        </div>
      </div>
      
      {/* Desktop Placeholder for the absolute positioned collapse button */}
      <div className="w-10 h-10 shrink-0 hidden md:block" />
    </div>
  );
};

export default SidebarHeader;
