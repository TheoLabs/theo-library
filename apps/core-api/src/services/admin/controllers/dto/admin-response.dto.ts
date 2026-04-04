import type { IAdminResponse, AdminRoleType } from '@theo-library/shared';
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
  role: AdminRoleType;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
