import {
  keepPreviousData,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import type { ContractCreateBody, ContractListParams } from "../models";
import { contractRepository } from "../api";
import { ContractType, ContractStatus } from "@theo-library/shared";
import { useMemo } from "react";

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
export const ContractTypeLabel: Record<ContractType, string> = {
  [ContractType.PURCHASE]: "컨텐츠 구매형",
  [ContractType.SUBSCRIPTION]: "구독형",
};

export const ContractStatusLabel: Record<ContractStatus, string> = {
  [ContractStatus.ACTIVE]: "활성",
  [ContractStatus.EXPIRED]: "만료",
};

export const useContractTypeOptions = () => {
  return useMemo(() => {
    return Object.values(ContractType).map((type) => ({
      label: ContractTypeLabel[type],
      value: type,
    }));
  }, []);
};

export const useContractStatusOptions = () => {
  return useMemo(() => {
    return Object.values(ContractStatus).map((status) => ({
      label: ContractStatusLabel[status],
      value: status,
    }));
  }, []);
};
