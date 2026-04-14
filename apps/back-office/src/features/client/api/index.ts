import { httpClient } from "@libs/http-client";
import type {
  ClientCreateParams,
  ClientListParams,
  ClientModel,
} from "../models";
import type { IPaginatedData } from "@theo-library/shared";

export const clientRepository = {
  async create(body: ClientCreateParams) {
    return httpClient.post<void>("/clients", body);
  },

  async list({ page, limit, sort, order, filter }: ClientListParams) {
    return httpClient.get<IPaginatedData<ClientModel>>("/clients", {
      params: {
        page,
        limit,
        sort,
        order,
        ...filter,
      },
    });
  },

  async retrieve({ clientId }: { clientId: number }) {
    return httpClient.get<ClientModel>(`/clients/${clientId}`);
  },
};
