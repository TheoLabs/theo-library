import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { clientRepository } from "../api";
import type { ClientListParams } from "../models";

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

// 4. custom hook
