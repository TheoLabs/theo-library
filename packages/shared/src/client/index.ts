export const ClientStatus = {
  PENDING: "pending",
  ACTIVE: "active",
  SUSPENDED: "suspended",
} as const;
export type ClientStatus = (typeof ClientStatus)[keyof typeof ClientStatus];

export interface IClientResponse {
  id: string;
  name: string;
  subDomain: string;
  contactNumber: string;
  address: string;
  status: ClientStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IClientQueryDto {
  searchKey?: string;
  searchValue?: string;
}
