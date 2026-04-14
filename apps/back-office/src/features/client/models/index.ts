import type {
  ClientStatus,
  IClientCreateDto,
  IPaginationParams,
} from "@theo-library/shared";

export interface ClientModel {
  id: number;
  name: string;
  subDomain: string;
  contactNumber: string;
  address: string;
  status: ClientStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientListParams extends IPaginationParams {
  filter?: {
    searchKey?: string;
    searchValue?: string;
  };
}

export type ClientCreateParams = IClientCreateDto;
