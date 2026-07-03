import { create } from 'zustand';
import type { Incident, IncidentFilters } from '../types';

interface IncidentState {
  incidents: Incident[];
  selectedIncidentId: string | null;
  filters: IncidentFilters;
  isLoading: boolean;
  totalCount: number;
  setIncidents: (incidents: Incident[]) => void;
  addIncident: (incident: Incident) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  setSelectedIncident: (id: string | null) => void;
  setFilters: (filters: IncidentFilters) => void;
  setLoading: (isLoading: boolean) => void;
  setTotalCount: (total: number) => void;
}

export const useIncidentStore = create<IncidentState>((set) => ({
  incidents: [],
  selectedIncidentId: null,
  filters: {},
  isLoading: false,
  totalCount: 0,
  setIncidents: (incidents) => set({ incidents }),
  addIncident: (incident) =>
    set((state) => ({ incidents: [incident, ...state.incidents], totalCount: state.totalCount + 1 })),
  updateIncident: (id, updates) =>
    set((state) => ({
      incidents: state.incidents.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    })),
  deleteIncident: (id) =>
    set((state) => ({
      incidents: state.incidents.filter((i) => i.id !== id),
      totalCount: state.totalCount - 1,
    })),
  setSelectedIncident: (selectedIncidentId) => set({ selectedIncidentId }),
  setFilters: (filters) => set({ filters }),
  setLoading: (isLoading) => set({ isLoading }),
  setTotalCount: (totalCount) => set({ totalCount }),
}));
