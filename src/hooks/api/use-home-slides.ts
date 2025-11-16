// @/hooks/api/use-home-slides.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type {
  HomeSlidesListResponse,
  HomeSlideResponse,
  CreateHomeSlideRequest,
  UpdateHomeSlideRequest,
  HomeSlidesQueryParams,
} from '@/types/api';

/**
 * React Query hooks for Home Slides API
 */

// Query Keys
export const homeSlidesKeys = {
  all: ['home-slides'] as const,
  lists: () => [...homeSlidesKeys.all, 'list'] as const,
  list: (params?: HomeSlidesQueryParams) => [...homeSlidesKeys.lists(), params] as const,
  details: () => [...homeSlidesKeys.all, 'detail'] as const,
  detail: (id: string) => [...homeSlidesKeys.details(), id] as const,
};

/**
 * Get paginated list of home slides
 */
export function useHomeSlides(params?: HomeSlidesQueryParams) {
  return useQuery({
    queryKey: homeSlidesKeys.list(params),
    queryFn: async () => {
      const response = await api.get<HomeSlidesListResponse>('/admin/home-slides', { params });
      return response.data;
    },
  });
}

/**
 * Get single home slide by ID
 */
export function useHomeSlide(id: string) {
  return useQuery({
    queryKey: homeSlidesKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<HomeSlideResponse>(`/admin/home-slides/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Create new home slide
 */
export function useCreateHomeSlide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateHomeSlideRequest) => {
      const response = await api.post<HomeSlideResponse>('/admin/home-slides', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: homeSlidesKeys.lists() });
    },
  });
}

/**
 * Update existing home slide
 */
export function useUpdateHomeSlide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateHomeSlideRequest }) => {
      const response = await api.patch<HomeSlideResponse>(`/admin/home-slides/${id}`, data);
      return response.data as unknown as HomeSlideResponse;
    },
    onSuccess: (response: HomeSlideResponse) => {
      queryClient.invalidateQueries({ queryKey: homeSlidesKeys.lists() });
      if (response.data && 'id' in response.data) {
        queryClient.invalidateQueries({ queryKey: homeSlidesKeys.detail(response.data.id as string) });
      }
    },
  });
}

/**
 * Delete home slide
 */
export function useDeleteHomeSlide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/home-slides/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: homeSlidesKeys.lists() });
    },
  });
}
