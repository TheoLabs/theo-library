import type { AdminRoleType, IPaginationParams } from "@theo-library/shared";

export interface AdminModel {
  id: number;
  name: string;
  email: string;
  status: AdminRoleType;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminListParams extends IPaginationParams {
  filter?: {
    clientId?: number;
    searchKey?: string;
    searchValue?: string;
    roles?: AdminRoleType[];
  };
}
