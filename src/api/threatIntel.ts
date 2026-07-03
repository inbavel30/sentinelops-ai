import { apiClient } from './client';
import type { ThreatIntel, IOC } from '../types';

export const threatIntelApi = {
  getAll: async (): Promise<ThreatIntel[]> => {
    const { data } = await apiClient.get<ThreatIntel[]>('/threat-intel');
    return data;
  },

  getById: async (id: string): Promise<ThreatIntel> => {
    const { data } = await apiClient.get<ThreatIntel>(`/threat-intel/${id}`);
    return data;
  },

  searchIOC: async (value: string): Promise<IOC[]> => {
    const { data } = await apiClient.get<IOC[]>('/threat-intel/ioc/search', { params: { q: value } });
    return data;
  },

  enrichIOC: async (value: string, type: IOC['type']): Promise<IOC> => {
    const { data } = await apiClient.post<IOC>('/threat-intel/ioc/enrich', { value, type });
    return data;
  },

  getWhois: async (domain: string): Promise<Record<string, unknown>> => {
    const { data } = await apiClient.get<Record<string, unknown>>(`/threat-intel/whois/${domain}`);
    return data;
  },

  getVirusTotal: async (hash: string): Promise<Record<string, unknown>> => {
    const { data } = await apiClient.get<Record<string, unknown>>(`/threat-intel/virustotal/${hash}`);
    return data;
  },

  getMitreTechniques: async (): Promise<Record<string, unknown>[]> => {
    const { data } = await apiClient.get<Record<string, unknown>[]>('/threat-intel/mitre/techniques');
    return data;
  },
};
