import { IClientCreateDto } from '@theo-library/shared';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClientCreateDto implements IClientCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  subDomain: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
