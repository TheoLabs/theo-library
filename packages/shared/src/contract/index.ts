import { CalendarDate } from "../common";
import { type IPaginationParams } from "../pagination";

export const ContractType = {
  PURCHASE: "purchase",
  SUBSCRIPTION: "subscription",
} as const;
export type ContractType = (typeof ContractType)[keyof typeof ContractType];

export const ContractStatus = {
  ACTIVE: "active",
  EXPIRED: "expired",
} as const;
export type ContractStatus =
  (typeof ContractStatus)[keyof typeof ContractStatus];

export interface IContractCreate {
  type: ContractType;
  startOn: CalendarDate;
  endOn: CalendarDate;
}

export interface IContractResponse {
  id: string;
  clientId: number;
  type: ContractType;
  status: ContractStatus;
  startOn: CalendarDate;
  endOn: CalendarDate;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContractQuery extends IPaginationParams {
  searchKey?: string;
  searchValue?: string;
  types?: ContractType[];
  statuses?: ContractStatus[];
}
