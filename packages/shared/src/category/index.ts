export interface ICategoryCreateDto {
  name: string;
}

export interface ICategoryUpdateDto {
  name: string;
}

export interface ICategoryQueryDto {
  searchKey?: string;
  searchValue?: string;
}

export interface ICategoryResponse {
  id: number;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
