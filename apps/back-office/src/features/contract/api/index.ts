import { httpClient } from "@libs/http-client";
import type {
  ContractCreateBody,
  ContractListParams,
  ContractModel,
} from "../models";
import type { IPaginatedData } from "@theo-library/shared";

export const contractRepository = {
  async create({ clientId, type, startOn, endOn }: ContractCreateBody) {
    return httpClient.post<void>(`/clients/${clientId}/contracts`, {
      type,
      startOn,
      endOn,
    });
  },

  async list({
    limit,
    page,
    order,
    sort,
    clientId,
    filter,
  }: ContractListParams) {
    return httpClient.get<IPaginatedData<ContractModel>>(
      `/clients/${clientId}/contracts`,
      {
        params: { limit, page, order, sort, ...filter },
      },
    );
  },
};
