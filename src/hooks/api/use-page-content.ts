// @/hooks/api/use-page-content.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type {
  PageContentsListResponse,
  PageContentResponse,
  CreatePageContentRequest,
  UpdatePageContentRequest,
  PaginationParams,
  SearchParams,
} from '@/types/api';

/**
 * React Query hooks for Page Content API
 */

type PageContentQueryParams = PaginationParams & SearchParams & {
  published?: boolean;
  categoryId?: string;
};

// Query Keys
export const pageContentKeys = {
  all: ['page-content'] as const,
  lists: () => [...pageContentKeys.all, 'list'] as const,
  list: (params?: PageContentQueryParams) => [...pageContentKeys.lists(), params] as const,
  details: () => [...pageContentKeys.all, 'detail'] as const,
  detail: (id: string) => [...pageContentKeys.details(), id] as const,
};

/**
 * Get paginated list of page content
 */
export function usePageContents(params?: PageContentQueryParams) {
  return useQuery({
    queryKey: pageContentKeys.list(params),
    queryFn: async () => {
      const response = await api.get<PageContentsListResponse>('/admin/page-content', { params });
      return response.data;
    },
  });
}

/**
 * Get single page content by ID
 */
export function usePageContent(id: string) {
  return useQuery({
    queryKey: pageContentKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<PageContentResponse>(`/admin/page-content/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Create new page content
 */
export function useCreatePageContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePageContentRequest) => {
      const response = await api.post<PageContentResponse>('/admin/page-content', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageContentKeys.lists() });
    },
  });
}

/**
 * Update existing page content
 */
export function useUpdatePageContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePageContentRequest }) => {
      const response = await api.patch<PageContentResponse>(`/admin/page-content/${id}`, data);
      return response.data as unknown as PageContentResponse;
    },
    onSuccess: (response: PageContentResponse) => {
      queryClient.invalidateQueries({ queryKey: pageContentKeys.lists() });
      if (response.data && 'id' in response.data) {
        queryClient.invalidateQueries({ queryKey: pageContentKeys.detail(response.data.id as string) });
      }
    },
  });
}

/**
 * Delete page content
 */
export function useDeletePageContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/page-content/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageContentKeys.lists() });
    },
  });
}
