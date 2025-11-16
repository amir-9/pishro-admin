// @/hooks/api/use-quiz-attempts.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type {
  QuizAttemptsListResponse,
  QuizAttemptResponse,
  QuizAttemptsQueryParams,
} from '@/types/api';

/**
 * React Query hooks for Quiz Attempts API
 */

// Query Keys
export const quizAttemptsKeys = {
  all: ['quiz-attempts'] as const,
  lists: () => [...quizAttemptsKeys.all, 'list'] as const,
  list: (params?: QuizAttemptsQueryParams) => [...quizAttemptsKeys.lists(), params] as const,
  details: () => [...quizAttemptsKeys.all, 'detail'] as const,
  detail: (id: string) => [...quizAttemptsKeys.details(), id] as const,
};

/**
 * Get paginated list of quiz attempts
 */
export function useQuizAttempts(params?: QuizAttemptsQueryParams) {
  return useQuery({
    queryKey: quizAttemptsKeys.list(params),
    queryFn: async () => {
      const response = await api.get<QuizAttemptsListResponse>('/admin/quiz-attempts', { params });
      return response.data;
    },
  });
}

/**
 * Get single quiz attempt by ID
 */
export function useQuizAttempt(id: string) {
  return useQuery({
    queryKey: quizAttemptsKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<QuizAttemptResponse>(`/admin/quiz-attempts/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}
