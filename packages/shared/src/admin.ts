/**
 * Admin 응답 인터페이스
 * core-api의 AdminResponseDto가 이 인터페이스를 구현합니다.
 */
export interface IAdminResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
