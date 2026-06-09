import React from 'react';
import RecentChatItem from './RecentChatItem';
import { useFetch } from '../../../hooks/useFetch';
import api from '../../../services/api';

const RecentChatList = ({ currentChatId, onSelectChat, refreshTrigger }) => {
  const { data: chatsData, refetch } = useFetch('/chat', {}, [refreshTrigger, currentChatId]);
  const chats = chatsData || [];

  const handleDelete = async (chatId) => {
    try {
      await api.delete(`/chat/${chatId}`);
      if (currentChatId === chatId && onSelectChat) {
        onSelectChat(null);
      } else {
        refetch();
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const getChatIcon = (title, index) => {
    const char = title ? title.charAt(0).toUpperCase() : 'C';
    const colors = [
      'from-[#A573FF] to-[#8C52FF]',
      'from-[#6B7AE4] to-[#4558C9]',
      'from-[#FF73A5] to-[#FF528C]',
      'from-[#2bdab2] to-[#1da586]'
    ];
    const color = colors[index % colors.length];
    
    return (
      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
        <span className="text-white text-[12px] font-bold tracking-wide">{char}</span>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-[#1a1a1a] text-[13px] font-medium tracking-wide mb-3 px-2 uppercase">RECENT CHATS</h3>
      <div className="bg-white/50 backdrop-blur-md rounded-[2rem] py-2 shadow-sm max-h-[350px] overflow-y-auto no-scrollbar">
        {chats.length === 0 ? (
          <p className="text-sm text-gray-500 px-5 py-2">No recent chats.</p>
        ) : (
          chats.map((chat, idx) => (
            <RecentChatItem 
              key={chat._id}
              title={chat.title || 'New Chat'} 
              icon={getChatIcon(chat.title || 'New Chat', idx)} 
              isLast={idx === chats.length - 1}
              isActive={currentChatId === chat._id}
              onClick={() => onSelectChat && onSelectChat(chat._id)}
              onDelete={() => handleDelete(chat._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentChatList;
