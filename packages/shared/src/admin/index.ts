export const AdminRoleType = {
  SUPER: "super",
  LIBRARY: "library",
} as const;
export type AdminRoleType = (typeof AdminRoleType)[keyof typeof AdminRoleType];

export const AdminStatusType = {
  PENDING: "pending",
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;
export type AdminStatusType =
  (typeof AdminStatusType)[keyof typeof AdminStatusType];

export interface IAdminResponse {
  id: string;
  name: string;
  email: string;
  role: AdminRoleType;
  status: AdminStatusType;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAdminQueryDto {
  searchKey?: string;
  searchValue?: string;
  roles?: AdminRoleType[];
  statuses?: AdminStatusType[];
}

export interface IAdminChangeStatusDto {
  status: AdminStatusType;
}
