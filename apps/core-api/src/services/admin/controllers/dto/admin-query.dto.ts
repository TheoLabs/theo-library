import { PaginationDto } from '@libs/utils';
import { AdminRoleType, IAdminQueryDto } from '@theo-library/shared';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ToArray } from '@libs/decorators';

export class AdminMemberQueryDto extends PaginationDto implements IAdminQueryDto {
  @IsString()
  @IsOptional()
  searchKey?: string;

  @IsString()
  @IsOptional()
  searchValue?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  clientId?: number;

  @IsEnum(AdminRoleType, { each: true })
  @ToArray()
  @IsOptional()
  roles?: AdminRoleType[];
}
