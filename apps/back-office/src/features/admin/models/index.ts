import type {
  AdminRoleType,
  IPaginationParams,
  AdminStatusType,
} from "@theo-library/shared";

export interface AdminModel {
  id: number;
  name: string;
  email: string;
  role: AdminRoleType;
  status: AdminStatusType;
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
