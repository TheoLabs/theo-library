import { Expose } from 'class-transformer';
import { ICategoryResponse } from '@theo-library/shared';

export class CategoryResponseDto implements ICategoryResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
