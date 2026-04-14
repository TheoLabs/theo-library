import { Column, Entity, OneToMany } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ClientStatus } from '@theo-library/shared';
import { Contract } from '../../contract/domain/contract.entity';

type Ctor = {
  name: string;
  subDomain: string;
  contactNumber: string;
  address: string;
};

@Entity()
export class Client extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '도서관명' })
  name: string;

  @Column({ comment: '서브 도메인' })
  subDomain: string;

  @Column({ comment: '연락처' })
  contactNumber: string;

  @Column({ comment: '주소' })
  address: string;

  @Column({ type: 'enum', enum: ClientStatus, comment: '상태' })
  status: ClientStatus;

  @OneToMany(() => Contract, (contract) => contract.client)
  contract: Contract;

  private constructor(args: Ctor) {
    super();

    if (args) {
      this.name = args.name;
      this.subDomain = args.subDomain;
      this.contactNumber = args.contactNumber;
      this.address = args.address;

      // NOTE: 초기화
      this.status = ClientStatus.PENDING;
    }
  }

  static of(args: Ctor) {
    return new Client(args);
  }
}
