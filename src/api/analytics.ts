import { apiClient } from './client';
import type { AnalyticsData } from '../types';

export const analyticsApi = {
  getDashboard: async (): Promise<AnalyticsData> => {
    const { data } = await apiClient.get<AnalyticsData>('/analytics/dashboard');
    return data;
  },

  getThreatTrends: async (days = 30): Promise<AnalyticsData['threatTrends']> => {
    const { data } = await apiClient.get<AnalyticsData['threatTrends']>('/analytics/threat-trends', { params: { days } });
    return data;
  },

  getIncidentTrends: async (days = 30): Promise<AnalyticsData['incidentTrends']> => {
    const { data } = await apiClient.get<AnalyticsData['incidentTrends']>('/analytics/incident-trends', { params: { days } });
    return data;
  },

  getResponseMetrics: async (): Promise<AnalyticsData['responseMetrics']> => {
    const { data } = await apiClient.get<AnalyticsData['responseMetrics']>('/analytics/response-metrics');
    return data;
  },

  getAnalystProductivity: async (): Promise<AnalyticsData['analystProductivity']> => {
    const { data } = await apiClient.get<AnalyticsData['analystProductivity']>('/analytics/analyst-productivity');
    return data;
  },
};
