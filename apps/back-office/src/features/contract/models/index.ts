import type {
  IContractCreate,
  IPaginationParams,
  IContractQuery,
  ContractType,
  ContractStatus,
} from "@theo-library/shared";

export interface ContractModel {
  id: number;
  type: ContractType;
  startOn: string;
  endOn: string;
  status: ContractStatus;
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
