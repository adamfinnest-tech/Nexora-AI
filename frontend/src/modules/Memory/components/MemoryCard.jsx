import React from 'react';
import { Edit2, Trash2, Clock } from 'lucide-react';

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  return date.toLocaleDateString();
};

const MemoryCard = ({ memory, onEdit, onDelete }) => {
  const getImportanceColor = (importance) => {
    switch (importance?.toLowerCase()) {
      case 'high': return 'bg-red-50 text-red-600 border-red-100';
      case 'medium': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'low': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem] p-5 flex flex-col group animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">{memory.key || 'Fact'}</h4>
        <div className="flex gap-1.5">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#8C52FF]/10 text-[#8C52FF] border border-[#8C52FF]/20">
            {memory.category}
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getImportanceColor(memory.importance)}`}>
            {memory.importance}
          </span>
        </div>
      </div>
      
      <p className="text-gray-800 font-medium text-[16px] mb-6 flex-1 break-words">
        {memory.value || memory.fact}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100/60">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{memory.createdAt ? formatRelativeTime(memory.createdAt) : 'Just now'}</span>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(memory)} className="p-1.5 text-gray-400 hover:text-[#8C52FF] hover:bg-black/5 rounded-lg transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(memory)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
