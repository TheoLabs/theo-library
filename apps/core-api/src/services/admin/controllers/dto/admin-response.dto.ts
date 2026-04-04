import type { IAdminResponse } from '@theo-library/shared';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminResponseDto implements IAdminResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
