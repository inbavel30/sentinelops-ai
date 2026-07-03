import { apiClient } from './client';
import type { Report } from '../types';

export const reportsApi = {
  getAll: async (): Promise<Report[]> => {
    const { data } = await apiClient.get<Report[]>('/reports');
    return data;
  },

  getById: async (id: string): Promise<Report> => {
    const { data } = await apiClient.get<Report>(`/reports/${id}`);
    return data;
  },

  create: async (report: Partial<Report>): Promise<Report> => {
    const { data } = await apiClient.post<Report>('/reports', report);
    return data;
  },

  generate: async (filters: Report['filters'], type: Report['type']): Promise<Report> => {
    const { data } = await apiClient.post<Report>('/reports/generate', { filters, type });
    return data;
  },

  update: async (id: string, updates: Partial<Report>): Promise<Report> => {
    const { data } = await apiClient.patch<Report>(`/reports/${id}`, updates);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/reports/${id}`);
  },

  export: async (id: string, format: string): Promise<Blob> => {
    const { data } = await apiClient.get<Blob>(`/reports/${id}/export`, {
      params: { format },
      responseType: 'blob',
    });
    return data;
  },
};
