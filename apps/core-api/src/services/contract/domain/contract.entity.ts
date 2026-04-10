import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { PrimaryGeneratedColumn } from 'typeorm';
import { type CalendarDate, ContractType, ContractStatus } from '@theo-library/shared';
import { Client } from '../../client/domain/client.model';

type Ctor = {
  clientId: number;
  type: ContractType;
  startOn: CalendarDate;
  endOn: CalendarDate;
};

@Entity()
@Index('idx_contract_client_id', ['clientId'])
export class Contract extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '고객사 ID' })
  clientId: number;

  @Column({ type: 'enum', enum: ContractType, comment: '계약 유형' })
  type: ContractType;

  @Column({ type: 'enum', enum: ContractStatus, comment: '계약 상태' })
  status: ContractStatus;

  @Column({ comment: '계약 시작일' })
  startOn: CalendarDate;

  @Column({ comment: '계약 종료일' })
  endOn: CalendarDate;

  @ManyToOne(() => Client, (client) => client.contract, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  private constructor(args: Ctor) {
    super();

    if (args) {
      this.clientId = args.clientId;
      this.type = args.type;
      this.startOn = args.startOn;
      this.endOn = args.endOn;

      // NOTE: 초기화
      this.status = ContractStatus.ACTIVE;
    }
  }

  static of(args: Ctor) {
    return new Contract(args);
  }
}
