import React from 'react';
import MemoryCard from './MemoryCard';
import EmptyMemoryState from './EmptyMemoryState';

const MemoryList = ({ memories, loading, onEdit, onDelete, onAddClick }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white/40 backdrop-blur-sm h-40 rounded-[1.5rem] animate-pulse border border-white/50"></div>
        ))}
      </div>
    );
  }

  if (!memories || memories.length === 0) {
    return <EmptyMemoryState onAddClick={onAddClick} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {memories.map((memory) => (
        <MemoryCard 
          key={memory._id} 
          memory={memory} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default MemoryList;
