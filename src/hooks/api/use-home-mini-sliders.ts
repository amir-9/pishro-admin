// @/hooks/api/use-home-mini-sliders.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type {
  HomeMiniSlidersListResponse,
  HomeMiniSliderResponse,
  CreateHomeMiniSliderRequest,
  UpdateHomeMiniSliderRequest,
  HomeMiniSlidersQueryParams,
} from '@/types/api';

/**
 * React Query hooks for Home Mini Sliders API
 */

// Query Keys
export const homeMiniSlidersKeys = {
  all: ['home-mini-sliders'] as const,
  lists: () => [...homeMiniSlidersKeys.all, 'list'] as const,
  list: (params?: HomeMiniSlidersQueryParams) => [...homeMiniSlidersKeys.lists(), params] as const,
  details: () => [...homeMiniSlidersKeys.all, 'detail'] as const,
  detail: (id: string) => [...homeMiniSlidersKeys.details(), id] as const,
};

/**
 * Get paginated list of home mini sliders
 */
export function useHomeMiniSliders(params?: HomeMiniSlidersQueryParams) {
  return useQuery({
    queryKey: homeMiniSlidersKeys.list(params),
    queryFn: async () => {
      const response = await api.get<HomeMiniSlidersListResponse>('/admin/home-mini-sliders', { params });
      return response.data;
    },
  });
}

/**
 * Get single home mini slider by ID
 */
export function useHomeMiniSlider(id: string) {
  return useQuery({
    queryKey: homeMiniSlidersKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<HomeMiniSliderResponse>(`/admin/home-mini-sliders/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Create new home mini slider
 */
export function useCreateHomeMiniSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateHomeMiniSliderRequest) => {
      const response = await api.post<HomeMiniSliderResponse>('/admin/home-mini-sliders', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: homeMiniSlidersKeys.lists() });
    },
  });
}

/**
 * Update existing home mini slider
 */
export function useUpdateHomeMiniSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateHomeMiniSliderRequest }) => {
      const response = await api.patch<HomeMiniSliderResponse>(`/admin/home-mini-sliders/${id}`, data);
      return response.data as unknown as HomeMiniSliderResponse;
    },
    onSuccess: (response: HomeMiniSliderResponse) => {
      queryClient.invalidateQueries({ queryKey: homeMiniSlidersKeys.lists() });
      if (response.data && 'id' in response.data) {
        queryClient.invalidateQueries({ queryKey: homeMiniSlidersKeys.detail(response.data.id as string) });
      }
    },
  });
}

/**
 * Delete home mini slider
 */
export function useDeleteHomeMiniSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/home-mini-sliders/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: homeMiniSlidersKeys.lists() });
    },
  });
}
