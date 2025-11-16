// @/hooks/api/use-lessons.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type {
  LessonsListResponse,
  LessonResponse,
  CreateLessonRequest,
  UpdateLessonRequest,
  LessonsQueryParams,
} from '@/types/api';

/**
 * React Query hooks for Lessons API
 */

// Query Keys
export const lessonsKeys = {
  all: ['lessons'] as const,
  lists: () => [...lessonsKeys.all, 'list'] as const,
  list: (params?: LessonsQueryParams) => [...lessonsKeys.lists(), params] as const,
  details: () => [...lessonsKeys.all, 'detail'] as const,
  detail: (id: string) => [...lessonsKeys.details(), id] as const,
};

/**
 * Get paginated list of lessons
 */
export function useLessons(params?: LessonsQueryParams) {
  return useQuery({
    queryKey: lessonsKeys.list(params),
    queryFn: async () => {
      const response = await api.get<LessonsListResponse>('/admin/lessons', { params });
      return response.data;
    },
  });
}

/**
 * Get single lesson by ID
 */
export function useLesson(id: string) {
  return useQuery({
    queryKey: lessonsKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<LessonResponse>(`/admin/lessons/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Create new lesson
 */
export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateLessonRequest) => {
      const response = await api.post<LessonResponse>('/admin/lessons', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
    },
  });
}

/**
 * Update existing lesson
 */
export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateLessonRequest }) => {
      const response = await api.patch<LessonResponse>(`/admin/lessons/${id}`, data);
      return response.data as unknown as LessonResponse;
    },
    onSuccess: (response: LessonResponse) => {
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
      if (response.data && 'id' in response.data) {
        queryClient.invalidateQueries({ queryKey: lessonsKeys.detail(response.data.id as string) });
      }
    },
  });
}

/**
 * Delete lesson
 */
export function useDeleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/lessons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
    },
  });
}
