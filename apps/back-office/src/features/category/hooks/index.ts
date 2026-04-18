import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryRepository } from "../api";
import type {
  CategoryListParams,
  CategoryCreateBody,
  CategoryUpdateBody,
} from "@features/category/models";

// 1. Init query keys
const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (params: CategoryListParams) =>
    [...categoryKeys.lists(), params] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
};

// 2. useQuery
export const useCategoryList = (params: CategoryListParams) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => categoryRepository.list(params),
  });

  return { categories, isLoading };
};

// 3. useMutation
export const useCategoryCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CategoryCreateBody) => categoryRepository.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

export const useCategoryUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CategoryUpdateBody) => categoryRepository.update(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

export const useCategoryRemove = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => categoryRepository.remove({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};
// 4. Custom hooks
