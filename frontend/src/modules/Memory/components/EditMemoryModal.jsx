import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';

const EditMemoryModal = ({ isOpen, onClose, onEdit, memory }) => {
  const [formData, setFormData] = useState({ key: '', value: '', category: 'Personal', importance: 'Medium' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (memory) {
      setFormData({
        key: memory.key || '',
        value: memory.value || '',
        category: memory.category || 'Personal',
        importance: memory.importance || 'Medium'
      });
    }
  }, [memory]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onEdit(memory._id, formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-slide-up">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Edit Memory</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Key</label>
            <input required type="text" value={formData.key} onChange={e => setFormData({...formData, key: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A573FF]/50 bg-white/50 font-medium text-gray-800" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Value</label>
            <textarea required rows={2} value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A573FF]/50 bg-white/50 resize-none font-medium text-gray-800" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A573FF]/50 bg-white/50 font-medium text-gray-800">
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
                <option value="Preferences">Preferences</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Importance</label>
              <select value={formData.importance} onChange={e => setFormData({...formData, importance: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A573FF]/50 bg-white/50 font-medium text-gray-800">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting || !formData.key || !formData.value} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#A573FF] to-[#8C52FF] hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemoryModal;
