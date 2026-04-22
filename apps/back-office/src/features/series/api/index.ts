import { httpClient } from "@libs/http-client";
import type { SeriesModel, SeriesListParams } from "../models";

import type { IPaginatedData } from "@theo-library/shared";

export const contractRepository = {
  async list({ limit, page, order, sort, filter }: SeriesListParams) {
    return httpClient.get<IPaginatedData<SeriesModel>>(`/series`, {
      params: { limit, page, order, sort, ...filter },
    });
  },
};
