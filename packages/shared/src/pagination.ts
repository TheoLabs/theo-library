export const OrderType = {
  ASC: "ASC",
  DESC: "DESC",
} as const;
export type OrderType = (typeof OrderType)[keyof typeof OrderType];

/**
 * 페이지네이션 쿼리 파라미터 인터페이스
 * core-api의 PaginationDto가 이 인터페이스를 구현합니다.
 */
export interface IPaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: OrderType;
}
