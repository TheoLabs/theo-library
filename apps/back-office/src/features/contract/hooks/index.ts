import {
  keepPreviousData,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import type { ContractCreateBody, ContractListParams } from "../models";
import { contractRepository } from "../api";

// 1. query keys
const contractKeys = {
  all: ["contracts"] as const,
  lists: () => [...contractKeys.all, "list"] as const,
  list: (params: ContractListParams) =>
    [...contractKeys.lists(), params] as const,
  details: () => [...contractKeys.all, "detail"] as const,
  detail: (id: number) => [...contractKeys.details(), id] as const,
};

// 2. queries
export const useContractList = (params: ContractListParams) => {
  const { data: contracts, isLoading } = useQuery({
    queryKey: contractKeys.list(params),
    queryFn: () => contractRepository.list(params),
    placeholderData: keepPreviousData,
  });

  return { contracts, isLoading };
};

// 3. mutations
export const useCreateContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ContractCreateBody) => contractRepository.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contractKeys.all });
    },
  });
};

// 4. custom hook
