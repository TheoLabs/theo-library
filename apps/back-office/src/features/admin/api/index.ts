import { httpClient } from "@libs/http-client";
import type { AdminListParams, AdminModel } from "../models";
import type { AdminStatusType, IPaginatedData } from "@theo-library/shared";

export const adminRepository = {
  async list({ page, limit, sort, order, filter }: AdminListParams) {
    return httpClient.get<IPaginatedData<AdminModel>>("/members", {
      params: {
        page,
        limit,
        sort,
        order,
        ...filter,
      },
    });
  },

  async changeStatus({ id, status }: { id: number; status: AdminStatusType }) {
    return httpClient.put(`/members/${id}/status`, { status });
  },
};
