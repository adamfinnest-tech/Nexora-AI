import React from 'react';
import { Brain, Plus } from 'lucide-react';

const EmptyMemoryState = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center w-full bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-sm mt-6">
      <div className="w-24 h-24 bg-gradient-to-br from-[#A573FF]/20 to-[#8C52FF]/20 rounded-full flex items-center justify-center mb-6 shadow-sm border border-white/80">
        <Brain className="w-12 h-12 text-[#8C52FF]" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No memories stored yet.</h3>
      <p className="text-gray-500 max-w-md mb-8">
        Nexora will remember important information you choose to save. Add facts about yourself to personalize your AI experience.
      </p>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-gradient-to-r from-[#A573FF] to-[#8C52FF] text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        <Plus className="w-4 h-4" />
        Add First Memory
      </button>
    </div>
  );
};

export default EmptyMemoryState;
