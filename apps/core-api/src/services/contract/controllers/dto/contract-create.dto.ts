import { ContractType, IContractCreateBody, type CalendarDate } from '@theo-library/shared';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ContractCreateDto implements Omit<IContractCreateBody, 'clientId'> {
  @IsEnum(ContractType)
  @IsNotEmpty()
  type: ContractType;

  @IsString()
  @IsNotEmpty()
  startOn: CalendarDate;

  @IsString()
  @IsNotEmpty()
  endOn: CalendarDate;
}
