import { PaginationDto } from '@libs/utils';
import { IAdminQueryDto } from '@theo-library/shared';
import { IsOptional, IsString } from 'class-validator';

export class AdminMemberQueryDto extends PaginationDto implements IAdminQueryDto {
  @IsString()
  @IsOptional()
  searchKey?: string;

  @IsString()
  @IsOptional()
  searchValue?: string;
}
