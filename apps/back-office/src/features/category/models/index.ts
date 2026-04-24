import type {
  ICategoryCreateDto,
  IPaginationParams,
  ICategoryUpdateDto,
} from "@theo-library/shared";

export interface CategoryModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryCreateBody = ICategoryCreateDto;

export interface CategoryListParams extends IPaginationParams {
  filter?: {
    searchKey?: string;
    searchValue?: string;
  };
}

export interface CategoryUpdateBody extends ICategoryUpdateDto {
  id: number;
}
