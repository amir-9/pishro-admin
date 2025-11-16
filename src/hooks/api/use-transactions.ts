// @/hooks/api/use-transactions.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type {
  TransactionsListResponse,
  TransactionResponse,
  TransactionsQueryParams,
} from '@/types/api';

/**
 * React Query hooks for Transactions API
 */

// Query Keys
export const transactionsKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionsKeys.all, 'list'] as const,
  list: (params?: TransactionsQueryParams) => [...transactionsKeys.lists(), params] as const,
  details: () => [...transactionsKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionsKeys.details(), id] as const,
};

/**
 * Get paginated list of transactions
 */
export function useTransactions(params?: TransactionsQueryParams) {
  return useQuery({
    queryKey: transactionsKeys.list(params),
    queryFn: async () => {
      const response = await api.get<TransactionsListResponse>('/admin/transactions', { params });
      return response.data;
    },
  });
}

/**
 * Get single transaction by ID
 */
export function useTransaction(id: string) {
  return useQuery({
    queryKey: transactionsKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<TransactionResponse>(`/admin/transactions/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}
