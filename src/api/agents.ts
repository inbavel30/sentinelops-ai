import { apiClient } from './client';
import type { AIAgent } from '../types';

export const agentsApi = {
  getAll: async (): Promise<AIAgent[]> => {
    const { data } = await apiClient.get<AIAgent[]>('/agents');
    return data;
  },

  getById: async (id: string): Promise<AIAgent> => {
    const { data } = await apiClient.get<AIAgent>(`/agents/${id}`);
    return data;
  },

  run: async (id: string, params?: Record<string, unknown>): Promise<void> => {
    await apiClient.post(`/agents/${id}/run`, params);
  },

  pause: async (id: string): Promise<void> => {
    await apiClient.post(`/agents/${id}/pause`);
  },

  resume: async (id: string): Promise<void> => {
    await apiClient.post(`/agents/${id}/resume`);
  },

  getLogs: async (id: string): Promise<AIAgent['logs']> => {
    const { data } = await apiClient.get<AIAgent['logs']>(`/agents/${id}/logs`);
    return data;
  },

  updateConfig: async (id: string, config: AIAgent['config']): Promise<AIAgent> => {
    const { data } = await apiClient.patch<AIAgent>(`/agents/${id}/config`, config);
    return data;
  },
};
