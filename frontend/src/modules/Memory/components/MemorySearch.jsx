import React from 'react';
import { Search } from 'lucide-react';

const MemorySearch = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search memories by key, value, or category..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A573FF]/50 shadow-sm text-gray-800 placeholder-gray-500 transition-all"
      />
    </div>
  );
};

export default MemorySearch;
