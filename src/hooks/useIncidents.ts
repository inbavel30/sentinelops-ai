// FILE: src/hooks/useIncidents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { incidentsApi } from '../api/incidents';
import { useIncidentStore } from '../store/incidentStore';

export function useIncidents(filters?: Parameters<typeof incidentsApi.getAll>[0]) {
  const queryClient = useQueryClient();
  const { setIncidents, setTotalCount, setLoading } = useIncidentStore();

  const query = useQuery({
    queryKey: ['incidents', filters],
    queryFn: async () => {
      setLoading(true);
      const response = await incidentsApi.getAll(filters);
      setIncidents(response.incidents);
      setTotalCount(response.total);
      setLoading(false);
      return response;
    },
    enabled: true,
  });

  const createMutation = useMutation({
    mutationFn: incidentsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['incidents'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Parameters<typeof incidentsApi.update>[1]> }) => 
      incidentsApi.update(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['incidents'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: incidentsApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['incidents'] }),
  });

  return {
    ...query,
    createIncident: createMutation.mutateAsync,
    updateIncident: updateMutation.mutateAsync,
    deleteIncident: deleteMutation.mutateAsync,
  };
}