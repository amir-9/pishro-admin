// @/hooks/api/use-newsletter-subscribers.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type {
  NewsletterSubscribersListResponse,
  NewsletterSubscriberResponse,
  PaginationParams,
  SearchParams,
} from '@/types/api';

/**
 * React Query hooks for Newsletter Subscribers API
 */

type NewsletterSubscribersQueryParams = PaginationParams & SearchParams;

// Query Keys
export const newsletterSubscribersKeys = {
  all: ['newsletter-subscribers'] as const,
  lists: () => [...newsletterSubscribersKeys.all, 'list'] as const,
  list: (params?: NewsletterSubscribersQueryParams) => [...newsletterSubscribersKeys.lists(), params] as const,
  details: () => [...newsletterSubscribersKeys.all, 'detail'] as const,
  detail: (id: string) => [...newsletterSubscribersKeys.details(), id] as const,
};

/**
 * Get paginated list of newsletter subscribers
 */
export function useNewsletterSubscribers(params?: NewsletterSubscribersQueryParams) {
  return useQuery({
    queryKey: newsletterSubscribersKeys.list(params),
    queryFn: async () => {
      const response = await api.get<NewsletterSubscribersListResponse>('/admin/newsletter-subscribers', { params });
      return response.data;
    },
  });
}

/**
 * Get single newsletter subscriber by ID
 */
export function useNewsletterSubscriber(id: string) {
  return useQuery({
    queryKey: newsletterSubscribersKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<NewsletterSubscriberResponse>(`/admin/newsletter-subscribers/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Delete newsletter subscriber
 */
export function useDeleteNewsletterSubscriber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/newsletter-subscribers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsletterSubscribersKeys.lists() });
    },
  });
}
