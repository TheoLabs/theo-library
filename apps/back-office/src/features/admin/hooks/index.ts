import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { adminRepository } from "../api";
import type { AdminListParams } from "../models";

// 1. query keys
const adminKeys = {
  all: ["admins"] as const,
  lists: () => [...adminKeys.all, "list"] as const,
  list: (params: AdminListParams) => [...adminKeys.lists(), params] as const,
  details: () => [...adminKeys.all, "detail"] as const,
  detail: (id: number) => [...adminKeys.details(), id] as const,
};

// 2. queries
export const useAdminList = (params: AdminListParams) => {
  const { data: admins, isLoading } = useQuery({
    queryKey: adminKeys.list(params),
    queryFn: () => adminRepository.list(params),
    placeholderData: keepPreviousData,
  });

  return { admins, isLoading };
};

// 3. mutations

// 4. custom hook
