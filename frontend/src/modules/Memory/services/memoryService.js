import api from '../../../services/api';

export const memoryService = {
  getMemories: async () => {
    const response = await api.get('/memory');
    return response.data;
  },
  createMemory: async (data) => {
    const response = await api.post('/memory', data);
    return response.data;
  },
  updateMemory: async (id, data) => {
    const response = await api.put(`/memory/${id}`, data);
    return response.data;
  },
  deleteMemory: async (id) => {
    const response = await api.delete(`/memory/${id}`);
    return response.data;
  }
};
