import type { IAdminResponse, AdminRoleType, AdminStatusType } from '@theo-library/shared';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminResponseDto implements IAdminResponse {
  @Expose()
  id: string;

  @Expose()
  clientId?: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: AdminRoleType;

  @Expose()
  status: AdminStatusType;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
