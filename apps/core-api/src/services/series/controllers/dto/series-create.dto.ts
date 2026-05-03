import { ISeriesCreateBodyDto } from '@theo-library/shared';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SeriesCreateDto implements ISeriesCreateBodyDto {
  @IsString()
  @IsNotEmpty()
  thumbnailImageUrl: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  illustrator: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsNumber()
  @IsNotEmpty()
  publicationCycleDay: number;

  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[];
}
