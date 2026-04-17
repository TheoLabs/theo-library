import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { clientRepository } from "../api";
import type { ClientCreateParams, ClientListParams } from "../models";
import { useQueryClient } from "@tanstack/react-query";
import { ClientStatus } from "@theo-library/shared";
import { theme } from "@libs/theme";
import { useMemo, useCallback } from "react";

// 1. query keys
const clientKeys = {
  all: ["clients"] as const,
  lists: () => [...clientKeys.all, "list"] as const,
  list: (params: ClientListParams) => [...clientKeys.lists(), params] as const,
  details: () => [...clientKeys.all, "detail"] as const,
  detail: (id: number) => [...clientKeys.details(), id] as const,
};

// 2. queries
export const useClientList = (params: ClientListParams) => {
  const { data: clients, isLoading } = useQuery({
    queryKey: clientKeys.list(params),
    queryFn: () => clientRepository.list(params),
    placeholderData: keepPreviousData,
  });

  return { clients, isLoading };
};

export const useClientDetail = ({ clientId }: { clientId: number }) => {
  const { data: client, isLoading } = useQuery({
    queryKey: clientKeys.detail(clientId),
    queryFn: () => clientRepository.retrieve({ clientId }),
    enabled: !!clientId,
  });

  return { client, isLoading };
};

// 3. mutations
export const useClientCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ClientCreateParams) => clientRepository.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
    },
  });
};

// 4. custom hook
export const useClientStatus = () => {
  const getStatusConfig = useCallback(
    (
      status: ClientStatus,
    ): {
      label: string;
      value: ClientStatus;
      color: string;
    } => {
      switch (status) {
        case ClientStatus.PENDING:
          return {
            label: "대기",
            value: ClientStatus.PENDING,
            color: theme.palette.chip.info,
          };
        case ClientStatus.ACTIVE:
          return {
            label: "활성",
            value: ClientStatus.ACTIVE,
            color: theme.palette.chip.success,
          };
        case ClientStatus.SUSPENDED:
          return {
            label: "중지",
            value: ClientStatus.SUSPENDED,
            color: theme.palette.chip.error,
          };
        default:
          return {
            label: "알 수 없음",
            value: status,
            color: theme.palette.grey[500],
          };
      }
    },
    [],
  );

  // 2. SelectBox 등에서 사용할 수 있도록 전체 옵션 배열도 함께 제공
  const statusOptions = useMemo(() => {
    return Object.values(ClientStatus).map((status) => getStatusConfig(status));
  }, [getStatusConfig]);

  return {
    getStatusConfig,
    statusOptions,
  };
};
