import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { adminRepository } from "../api";
import type { AdminListParams } from "../models";
import { AdminStatusType, AdminRoleType } from "@theo-library/shared";
import { useCallback, useMemo } from "react";
import { theme } from "@libs/theme";

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
export const useAdminStatusLabel = () => {
  return useCallback((status: AdminStatusType) => {
    switch (status) {
      case AdminStatusType.PENDING:
        return { label: "대기", color: theme.palette.chip.warning };
      case AdminStatusType.ACTIVE:
        return { label: "활성", color: theme.palette.chip.success };
      case AdminStatusType.INACTIVE:
        return { label: "비활성", color: theme.palette.chip.error };
    }
  }, []);
};

export const useAdminRoleLabel = () => {
  return useCallback((role: AdminRoleType) => {
    switch (role) {
      case AdminRoleType.SUPER:
        return { label: "사내 직원", color: theme.palette.chip.info };
      case AdminRoleType.LIBRARY:
        return { label: "도서관", color: theme.palette.chip.success };
    }
  }, []);
};

export const useAdminRoleOptions = () => {
  const getRoleLabel = useAdminRoleLabel();

  return useMemo(() => {
    return Object.values(AdminRoleType).map((value) => ({
      label: getRoleLabel(value).label,
      value,
    }));
  }, [getRoleLabel]);
};

export const useAdminStatusOptions = () => {
  const getStatusLabel = useAdminStatusLabel();

  return useMemo(() => {
    return Object.values(AdminStatusType).map((value) => ({
      label: getStatusLabel(value).label,
      value,
    }));
  }, [getStatusLabel]);
};
