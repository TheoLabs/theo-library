import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { randomId } from '@libs/utils';

type Ctor = {
  name: string;
  email: string;
};

@Entity('admin')
export class Admin extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ comment: '이름' })
  name: string;

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
