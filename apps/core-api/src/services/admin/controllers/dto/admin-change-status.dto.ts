import { IAdminChangeStatusDto } from '@theo-library/shared';
import { IsEnum, IsString } from 'class-validator';
import { AdminStatusType } from '@theo-library/shared';

export class AdminChangeStatusDto implements IAdminChangeStatusDto {
  @IsEnum(AdminStatusType)
  status: AdminStatusType;
}
