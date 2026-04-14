import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { randomId } from '@libs/utils';
import { AdminRoleType } from '@theo-library/shared';

type Ctor = {
  name: string;
  clientId?: number;
  email: string;
  role: AdminRoleType;
};

@Entity()
export class Admin extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ comment: '속한 도서관 ID (도서관 계정일 경우에만 존재)' })
  clientId?: number;

  @Column({ comment: '이름' })
  name: string;

  @Column({ type: 'enum', enum: AdminRoleType, comment: '역할' })
  role: AdminRoleType;

  @Column({ comment: '이메일' })
  email: string;

  private constructor(args: Ctor) {
    super();

    if (args) {
      this.id = randomId();
      this.clientId = args.clientId;
      this.name = args.name;
      this.role = args.role;
      this.email = args.email;
    }
  }

  static of(args: Ctor) {
    return new Admin(args);
  }
}
