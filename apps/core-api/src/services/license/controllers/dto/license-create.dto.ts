import { ILicenseCreateBody } from '@theo-library/shared';
import { IsInt, IsPositive } from 'class-validator';

export class LicenseCreateDto implements ILicenseCreateBody {
  @IsInt()
  @IsPositive()
  clientId: number;

  @IsInt()
  @IsPositive()
  seriesId: number;

  @IsInt()
  @IsPositive()
  contractCopyCount: number;
}
