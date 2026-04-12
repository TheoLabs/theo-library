import type {
  ClientStatus,
  IContractCreate,
  IPaginationParams,
  IContractQuery,
} from "@theo-library/shared";

export interface ContractModel {
  id: number;
  name: string;
  subDomain: string;
  contactNumber: string;
  address: string;
  status: ClientStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContractListParams extends IPaginationParams {
  clientId?: number;
  filter?: IContractQuery;
}

export interface ContractCreateBody extends IContractCreate {
  clientId: number;
}
