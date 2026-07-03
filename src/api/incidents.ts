import { apiClient } from './client';
import type { Incident, Comment, Attachment } from '../types';

export interface IncidentFilters {
  severity?: string[];
  status?: string[];
  category?: string[];
  assignee?: string[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IncidentListResponse {
  incidents: Incident[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const incidentsApi = {
  getAll: async (filters?: IncidentFilters): Promise<IncidentListResponse> => {
    const { data } = await apiClient.get<IncidentListResponse>('/incidents', { params: filters });
    return data;
  },

  getById: async (id: string): Promise<Incident> => {
    const { data } = await apiClient.get<Incident>(`/incidents/${id}`);
    return data;
  },

  create: async (incident: Partial<Incident>): Promise<Incident> => {
    const { data } = await apiClient.post<Incident>('/incidents', incident);
    return data;
  },

  update: async (id: string, updates: Partial<Incident>): Promise<Incident> => {
    const { data } = await apiClient.patch<Incident>(`/incidents/${id}`, updates);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/incidents/${id}`);
  },

  bulkUpdate: async (ids: string[], updates: Partial<Incident>): Promise<Incident[]> => {
    const { data } = await apiClient.post<Incident[]>('/incidents/bulk-update', { ids, updates });
    return data;
  },

  bulkDelete: async (ids: string[]): Promise<void> => {
    await apiClient.post('/incidents/bulk-delete', { ids });
  },

  addComment: async (id: string, comment: Partial<Comment>): Promise<Comment> => {
    const { data } = await apiClient.post<Comment>(`/incidents/${id}/comments`, comment);
    return data;
  },

  addAttachment: async (id: string, file: File): Promise<Attachment> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post<Attachment>(`/incidents/${id}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  getTimeline: async (id: string): Promise<Incident['timeline']> => {
    const { data } = await apiClient.get<Incident['timeline']>(`/incidents/${id}/timeline`);
    return data;
  },

  runPlaybook: async (id: string, playbookId: string): Promise<void> => {
    await apiClient.post(`/incidents/${id}/playbooks/${playbookId}/run`);
  },
};
