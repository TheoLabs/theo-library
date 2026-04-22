import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { contractRepository } from "../api";
import type { SeriesListParams } from "../models";

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
      initialPageParam: 1, // 첫 페이지 번호
      queryFn: ({ pageParam = 1 }) =>
        contractRepository.list({ ...params, page: pageParam }),

      // 다음 페이지 번호를 구하는 핵심 로직
      getNextPageParam: (lastPage, allPages) => {
        // 받아온 데이터 갯수가 limit보다 적으면 마지막 페이지로 간주 (undefined 반환)
        // *백엔드 응답 형태가 lastPage.items 형태라고 가정했습니다.
        const isLastPage = lastPage.items.length < (params.limit || 10);
        if (isLastPage) return undefined;

        // 다음 페이지 번호 반환
        return allPages.length + 1;
      },
    });

  // 렌더링하기 편하도록 [[1페이지 배열], [2페이지 배열]] 구조를
  // [1, 2, 3, 4...] 처럼 1차원 배열로 평탄화(flatten) 해줍니다.
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
// 4. Custom hooks
