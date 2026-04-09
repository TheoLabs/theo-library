import { IContractResponse, type CalendarDate, ContractType, ContractStatus } from '@theo-library/shared';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminContractResponseDto implements IContractResponse {
  @Expose()
  id: string;

  @Expose()
  clientId: number;

  @Expose()
  type: ContractType;

  @Expose()
  status: ContractStatus;

  @Expose()
  startOn: CalendarDate;

  @Expose()
  endOn: CalendarDate;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
