import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
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

// export const useAdminDetail = (id: number) => {
//   const { data: admin, isLoading } = useQuery({
//     queryKey: adminKeys.detail(id),
//     queryFn: () => adminRepository.retrieve(id),
//   });

//   return { admin, isLoading };
// };

// // 3. mutations
// export const useCreateAdmin = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (body: AdminCreateBody) => adminRepository.create(body),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: adminKeys.all });
//     },
//   });
// };

// export const useUpdateAdmin = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (body: { id: number; status?: AdminStatus }) => adminRepository.update(body),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: adminKeys.all });
//     },
//   });
// };

// // 4. custom hook
