import { httpClient } from "@libs/http-client";
import type {
  SeriesModel,
  SeriesListParams,
  SeriesCreateBody,
} from "../models";
import type { IPaginatedData } from "@theo-library/shared";

export const contractRepository = {
  async create(body: SeriesCreateBody) {
    return httpClient.post<void>(`/series`, body);
  },

  async list({ limit, page, order, sort, filter }: SeriesListParams) {
    return httpClient.get<IPaginatedData<SeriesModel>>(`/series`, {
      params: { limit, page, order, sort, ...filter },
    });
  },

  async retrieve(id: number) {
    return httpClient.get<SeriesModel>(`/series/${id}`);
  },
};
