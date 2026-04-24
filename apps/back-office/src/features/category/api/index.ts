import type {
  CategoryCreateBody,
  CategoryListParams,
  CategoryUpdateBody,
} from "@features/category/models";
import { httpClient } from "@libs/http-client";
import type { IPaginatedData } from "@theo-library/shared";
import type { CategoryModel } from "../models";

export const categoryRepository = {
  async create(body: CategoryCreateBody) {
    return httpClient.post<void>("/categories", body);
  },

  async list({ sort, order, page, limit, filter }: CategoryListParams) {
    return httpClient.get<IPaginatedData<CategoryModel>>("/categories", {
      params: {
        sort,
        order,
        page,
        limit,
        ...filter,
      },
    });
  },

  async update({ id, name }: CategoryUpdateBody) {
    return httpClient.put<void>(`/categories/${id}`, { id, name });
  },

  async remove({ id }: { id: number }) {
    return httpClient.delete<void>(`/categories/${id}`);
  },
};
