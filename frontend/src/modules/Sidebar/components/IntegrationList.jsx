import React, { useState, useEffect } from 'react';
import { Search, Loader2, CheckCircle2 } from 'lucide-react';
import googleCalendarIcon from '../../../assets/google-calendar-svgrepo-com.svg';
import gmailIcon from '../../../assets/gmail-svgrepo-com.svg';

const IntegrationList = () => {
  const [loadingApp, setLoadingApp] = useState(null);
  const [connectedApps, setConnectedApps] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('http://localhost:5000/api/integrations', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setConnectedApps(data);
        }
      } catch (err) {
        console.error('Failed to fetch connections', err);
      }
    };
    fetchConnections();
  }, []);

  const handleConnect = async (appName) => {
    try {
      setLoadingApp(appName);
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/integrations/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ appName })
      });

      if (!res.ok) throw new Error('Failed to fetch connection URL');

      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Could not initiate connection. Please try again.');
    } finally {
      setLoadingApp(null);
    }
  };

  return (
    <div>
      <h3 className="text-[#1a1a1a] text-[13px] font-medium tracking-wide mb-3 px-2 uppercase">INTEGRATIONS</h3>
      <div className="bg-white/50 backdrop-blur-md rounded-[2rem] py-2 shadow-sm">
        
        <div className="px-2">
          {/* <div className="flex items-center gap-3 py-2 px-3 cursor-pointer hover:bg-white/30 rounded-xl transition-colors border-b border-black/5">
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <Search className="w-[22px] h-[22px] text-gray-600" strokeWidth={1.5} />
            </div>
            <p className="text-[#1a1a1a] font-medium text-[15px]">Web Search</p>
          </div> */}
        </div>

        <div className="px-2">
          <div 
            onClick={() => handleConnect('gmail')}
            className="flex items-center gap-3 py-2 px-3 cursor-pointer hover:bg-white/30 rounded-xl transition-colors border-b border-black/5"
          >
            <div className="w-9 h-9 flex items-center justify-center shrink-0 relative">
              {loadingApp === 'gmail' ? (
                <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
              ) : (
                <img src={gmailIcon} alt="Gmail" className="w-[22px] h-[22px]" />
              )}
            </div>
            <p className="text-[#1a1a1a] font-medium text-[15px] flex-1">{loadingApp === 'gmail' ? 'Connecting...' : 'Gmail'}</p>
            {connectedApps.includes('gmail') && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Connected
              </span>
            )}
          </div>
        </div>

        <div className="px-2">
          <div 
            onClick={() => handleConnect('googlecalendar')}
            className="flex items-center gap-3 py-2 px-3 cursor-pointer hover:bg-white/30 rounded-xl transition-colors"
          >
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              {loadingApp === 'googlecalendar' ? (
                <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
              ) : (
                <img src={googleCalendarIcon} alt="Google Calendar" className="w-[22px] h-[22px]" />
              )}
            </div>
            <p className="text-[#1a1a1a] font-medium text-[15px] flex-1">{loadingApp === 'googlecalendar' ? 'Connecting...' : 'Calendar'}</p>
            {connectedApps.includes('googlecalendar') && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Connected
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default IntegrationList;
