import { PaginationDto } from '@libs/utils';
import { IsOptional, IsString } from 'class-validator';
import { IClientQueryDto } from '@theo-library/shared';

export class AdminClientQueryDto extends PaginationDto implements IClientQueryDto {
  @IsString()
  @IsOptional()
  searchKey?: string;

  @IsString()
  @IsOptional()
  searchValue?: string;
}
