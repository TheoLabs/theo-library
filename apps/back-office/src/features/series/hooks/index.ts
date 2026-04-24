import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { contractRepository } from "../api";
import type { SeriesListParams, SeriesCreateBody } from "../models";

// 1. Init query keys
const seriesKeys = {
  all: ["series"] as const,
  lists: () => [...seriesKeys.all, "list"] as const,
  list: (params: SeriesListParams) => [...seriesKeys.lists(), params] as const,
  details: () => [...seriesKeys.all, "detail"] as const,
  detail: (id: number) => [...seriesKeys.details(), id] as const,
};

// 2. useQuery
export const useInfiniteSeriesList = (
  params: Omit<SeriesListParams, "page">,
) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: seriesKeys.list(params),
      initialPageParam: 1,
      queryFn: ({ pageParam = 1 }) =>
        contractRepository.list({ ...params, page: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        const isLastPage = lastPage.items.length < (params.limit || 10);
        if (isLastPage) return undefined;

        return allPages.length + 1;
      },
    });

  const flatSeriesList = data?.pages.flatMap((page) => page.items) || [];

  return {
    seriesList: flatSeriesList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export const useSeriesDetail = (id: number) => {
  const { data: series, isLoading } = useQuery({
    queryKey: seriesKeys.detail(id),
    queryFn: () => contractRepository.retrieve(id),
    enabled: !!id,
  });

  return { series, isLoading };
};

// 3. useMutation
export const useSeriesCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: SeriesCreateBody) => contractRepository.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: seriesKeys.all });
    },
  });
};

// 4. Custom hooks
