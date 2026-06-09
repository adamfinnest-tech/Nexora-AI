import { useState, useEffect, useCallback } from 'react';
import { memoryService } from '../services/memoryService';

export const useMemory = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMemories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await memoryService.getMemories();
      setMemories(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch memories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const addMemory = async (data) => {
    try {
      const newMemory = await memoryService.createMemory(data);
      setMemories(prev => [newMemory, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const editMemory = async (id, data) => {
    try {
      const updatedMemory = await memoryService.updateMemory(id, data);
      setMemories(prev => prev.map(m => m._id === id ? updatedMemory : m));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const removeMemory = async (id) => {
    try {
      await memoryService.deleteMemory(id);
      setMemories(prev => prev.filter(m => m._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  return { memories, loading, error, addMemory, editMemory, removeMemory, refresh: fetchMemories };
};
