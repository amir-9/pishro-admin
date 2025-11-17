// @/hooks/api/use-business-consulting.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type {
  BusinessConsultingListResponse,
  BusinessConsultingResponse,
  CreateBusinessConsultingRequest,
  UpdateBusinessConsultingRequest,
  BusinessConsultingQueryParams,
  BusinessConsulting,
} from "@/types/api";

/**
 * React Query hooks for Investment Consulting API
 */

// Query Keys
export const businessConsultingKeys = {
  all: ["business-consulting"] as const,
  lists: () => [...businessConsultingKeys.all, "list"] as const,
  list: (params?: BusinessConsultingQueryParams) =>
    [...businessConsultingKeys.lists(), params] as const,
  details: () => [...businessConsultingKeys.all, "detail"] as const,
  detail: (id: string) => [...businessConsultingKeys.details(), id] as const,
};

/**
 * Get paginated list of investment consulting pages
 */
export function useBusinessConsulting(params?: BusinessConsultingQueryParams) {
  return useQuery<BusinessConsultingListResponse>({
    queryKey: businessConsultingKeys.list(params),
    queryFn: async () => {
      const response = await api.get<BusinessConsultingListResponse>(
        "/admin/business-consulting",
        { params },
      );
      return response;
    },
  });
}

/**
 * Get single investment consulting page by ID
 */
export function useBusinessConsultingDetail(id: string) {
  return useQuery<BusinessConsultingResponse>({
    queryKey: businessConsultingKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<BusinessConsultingResponse>(
        `/admin/business-consulting/${id}`,
      );
      return response;
    },
    enabled: !!id,
  });
}

/**
 * Create new investment consulting page
 */
export function useCreateBusinessConsulting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBusinessConsultingRequest) => {
      const response = await api.post<BusinessConsultingResponse>(
        "/admin/business-consulting",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: businessConsultingKeys.lists(),
      });
    },
  });
}

/**
 * Update existing investment consulting page
 */
export function useUpdateBusinessConsulting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateBusinessConsultingRequest;
    }) => {
      const response = await api.patch<BusinessConsultingResponse>(
        `/admin/business-consulting/${id}`,
        data,
      );
      return response.data as unknown as BusinessConsultingResponse;
    },
    onSuccess: (response: BusinessConsultingResponse) => {
      queryClient.invalidateQueries({
        queryKey: businessConsultingKeys.lists(),
      });
      if (response.data && "id" in response.data) {
        queryClient.invalidateQueries({
          queryKey: businessConsultingKeys.detail(response.data.id as string),
        });
      }
    },
  });
}

/**
 * Delete investment consulting page
 */
export function useDeleteBusinessConsulting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/business-consulting/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: businessConsultingKeys.lists(),
      });
    },
  });
}
