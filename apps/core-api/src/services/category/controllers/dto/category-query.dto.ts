import { ICategoryQueryDto } from '@theo-library/shared';
import { IsOptional, IsString } from 'class-validator';

export class CategoryQueryDto implements ICategoryQueryDto {
  @IsOptional()
  @IsOptional()
  searchKey?: string;

  @IsString()
  @IsOptional()
  searchValue?: string;
}
