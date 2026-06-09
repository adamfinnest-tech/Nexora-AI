import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/ChatPage';
import sphere from '../../assets/sphere.png';

const DashboardLayout = ({ children }) => {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [refreshChatsTrigger, setRefreshChatsTrigger] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChatCreated = (id) => {
    setCurrentChatId(id);
    setRefreshChatsTrigger(prev => prev + 1);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };
  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-[#F3F0FF] bg-[radial-gradient(at_0%_0%,_#FCE7EC_0px,_transparent_50%),radial-gradient(at_100%_0%,_#E6D8FA_0px,_transparent_50%),radial-gradient(at_0%_100%,_#CDE4FF_0px,_transparent_50%),radial-gradient(at_100%_100%,_#ECC2DF_0px,_transparent_50%)]">
      
      {/* Background Decorative Spheres */}
      <img src={sphere} alt="" className="absolute top-[10%] left-[5%] w-32 h-32 object-cover blur-[4px] opacity-60 pointer-events-none" />
      <img src={sphere} alt="" className="absolute bottom-[20%] right-[10%] w-64 h-64 object-cover blur-[60px] opacity-40 pointer-events-none" />

      {/* Main Layout Container */}
      <div className="relative z-10 w-full h-screen flex max-w-[1800px] mx-auto overflow-hidden">
        <Sidebar 
          currentChatId={currentChatId} 
          onSelectChat={(id) => {
            setCurrentChatId(id);
            setIsMobileMenuOpen(false); // Close mobile menu when a chat is selected
            if (location.pathname !== '/') {
              navigate('/');
            }
          }} 
          refreshTrigger={refreshChatsTrigger} 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        {children || (
          <Chat 
            currentChatId={currentChatId} 
            onChatCreated={handleChatCreated} 
            onMenuClick={() => setIsMobileMenuOpen(true)}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
