/**
 * 페이지네이션 데이터
 */
export interface IPaginatedData<T> {
  total: number;
  items: T[];
}

/**
 * 페이지네이션 응답
 * @example { data: { total: 100, items: [...] } }
 */
export interface IPaginatedResponse<T> {
  data: IPaginatedData<T>;
}

/**
 * 에러 응답
 * @example { data: { message: '서버에 예기치 않은 오류가 발생했습니다.' } }
 */
export interface IErrorResponse {
  data: {
    message: string;
  };
}
