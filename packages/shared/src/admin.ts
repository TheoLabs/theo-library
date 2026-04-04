export const AdminRoleType = {
  SUPER: "super",
  LIBRARY: "library",
} as const;
export type AdminRoleType = (typeof AdminRoleType)[keyof typeof AdminRoleType];

export interface IAdminResponse {
  id: string;
  name: string;
  email: string;
  role: AdminRoleType;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAdminQueryDto {
  searchKey?: string;
  searchValue?: string;
}
