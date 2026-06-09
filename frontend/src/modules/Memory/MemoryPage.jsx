import React, { useState, useMemo } from 'react';
import { useMemory } from './hooks/useMemory';
import { Brain, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MemoryList from './components/MemoryList';
import MemorySearch from './components/MemorySearch';
import AddMemoryModal from './components/AddMemoryModal';
import EditMemoryModal from './components/EditMemoryModal';
import DeleteMemoryDialog from './components/DeleteMemoryDialog';

const MemoryPage = () => {
  const { memories, loading, error, addMemory, editMemory, removeMemory } = useMemory();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editMemoryData, setEditMemoryData] = useState(null);
  const [deleteMemoryData, setDeleteMemoryData] = useState(null);

  const filteredMemories = useMemo(() => {
    if (!searchQuery.trim()) return memories;
    const query = searchQuery.toLowerCase();
    return memories.filter(m => 
      m.key?.toLowerCase().includes(query) || 
      m.value?.toLowerCase().includes(query) || 
      m.category?.toLowerCase().includes(query)
    );
  }, [memories, searchQuery]);

  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto px-4 md:px-8 py-8 animate-fade-in relative z-10 overflow-y-auto">
      {/* Back Button */}
      <div className="mb-6 flex">
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-white/50 text-gray-700 hover:text-[#8C52FF] font-medium text-sm transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(140,82,255,0.08)] cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-[#8C52FF] transition-all duration-300 group-hover:-translate-x-0.5" />
          <span>Back to Settings</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 mt-4 md:mt-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A573FF] to-[#8C52FF] flex items-center justify-center shadow-md border border-white/20">
              <Brain className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Nexora Memory</h1>
          </div>
          <p className="text-gray-500 max-w-xl leading-relaxed mt-3">
            Nexora uses memory to personalize conversations and remember important information across chats.
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-[13px] font-semibold text-[#8C52FF] bg-[#8C52FF]/10 px-4 py-2 rounded-2xl border border-[#8C52FF]/20 shadow-sm">
          <span>{memories.length} memories stored</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 mb-6 text-sm font-medium shadow-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2 bg-white/40 p-3 rounded-[2rem] border border-white/60 shadow-sm backdrop-blur-md">
        <MemorySearch value={searchQuery} onChange={setSearchQuery} />
        
        <button 
          onClick={() => setIsAddOpen(true)}
          className="flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-[#A573FF] to-[#8C52FF] hover:opacity-90 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap"
        >
          <Plus className="w-4 h-4" strokeWidth={3} />
          Add Memory
        </button>
      </div>

      <MemoryList 
        memories={filteredMemories} 
        loading={loading}
        onEdit={setEditMemoryData}
        onDelete={setDeleteMemoryData}
        onAddClick={() => setIsAddOpen(true)}
      />

      <AddMemoryModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onAdd={addMemory} 
      />
      
      <EditMemoryModal 
        isOpen={!!editMemoryData} 
        onClose={() => setEditMemoryData(null)} 
        memory={editMemoryData} 
        onEdit={editMemory} 
      />
      
      <DeleteMemoryDialog 
        isOpen={!!deleteMemoryData} 
        onClose={() => setDeleteMemoryData(null)} 
        memory={deleteMemoryData} 
        onDelete={removeMemory} 
      />
    </div>
  );
};

export default MemoryPage;
