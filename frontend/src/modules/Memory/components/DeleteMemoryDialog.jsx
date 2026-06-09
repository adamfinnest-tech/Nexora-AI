import React, { useState } from 'react';
import { X, Trash2, Loader2, AlertTriangle } from 'lucide-react';

const DeleteMemoryDialog = ({ isOpen, onClose, onDelete, memory }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !memory) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(memory._id);
    setIsDeleting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden animate-slide-up">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Memory?</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Are you sure you want to delete the memory regarding <span className="font-semibold text-gray-700">"{memory.key || 'this fact'}"</span>? Nexora AI will no longer retain this information.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md disabled:opacity-50"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemoryDialog;
