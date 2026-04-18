import { ICategoryCreateDto, ICategoryUpdateDto } from '@theo-library/shared';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryCreateDto implements ICategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CategoryUpdateDto implements ICategoryUpdateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
