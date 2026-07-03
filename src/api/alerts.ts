import { apiClient } from './client';
import type { Alert } from '../types';

export interface AlertFilters {
  severity?: string[];
  status?: string[];
  source?: string[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AlertListResponse {
  alerts: Alert[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const alertsApi = {
  getAll: async (filters?: AlertFilters): Promise<AlertListResponse> => {
    const { data } = await apiClient.get<AlertListResponse>('/alerts', { params: filters });
    return data;
  },

  getById: async (id: string): Promise<Alert> => {
    const { data } = await apiClient.get<Alert>(`/alerts/${id}`);
    return data;
  },

  acknowledge: async (id: string): Promise<Alert> => {
    const { data } = await apiClient.post<Alert>(`/alerts/${id}/acknowledge`);
    return data;
  },

  suppress: async (id: string, reason: string): Promise<Alert> => {
    const { data } = await apiClient.post<Alert>(`/alerts/${id}/suppress`, { reason });
    return data;
  },

  createIncident: async (id: string): Promise<{ incidentId: string }> => {
    const { data } = await apiClient.post<{ incidentId: string }>(`/alerts/${id}/create-incident`);
    return data;
  },

  enrich: async (id: string): Promise<Alert> => {
    const { data } = await apiClient.post<Alert>(`/alerts/${id}/enrich`);
    return data;
  },
};
