import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { randomId } from '@libs/utils';
import { AdminRoleType } from '@theo-library/shared';

type Ctor = {
  name: string;
  email: string;
};

@Entity()
export class Admin extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ comment: '이름' })
  name: string;

  @Column({ type: 'enum', enum: AdminRoleType, comment: '역할' })
  role: AdminRoleType;

  @Column({ comment: '이메일' })
  email: string;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.id = randomId();
      this.name = args.name;
      this.email = args.email;
    }
  }
}
