import { apiClient } from './client';
import type { AuditLog } from '../types';

export interface AuditFilters {
  action?: string[];
  actor?: string[];
  severity?: string[];
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export const auditApi = {
  getAll: async (filters?: AuditFilters): Promise<{ logs: AuditLog[]; total: number }> => {
    const { data } = await apiClient.get<{ logs: AuditLog[]; total: number }>('/audit', { params: filters });
    return data;
  },

  export: async (filters?: AuditFilters): Promise<Blob> => {
    const { data } = await apiClient.get<Blob>('/audit/export', { params: filters, responseType: 'blob' });
    return data;
  },
};
