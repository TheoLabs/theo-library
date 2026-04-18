import { ICategoryCreateDto } from '@theo-library/shared';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryCreateDto implements ICategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
