import { DddAggregate } from '@libs/ddd';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type Ctor = {
  filename: string;
  mimeType: string;
  url: string;
};

@Entity()
export class File extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimeType: string;

  @Column()
  url: string;

  @Column({ comment: 'S3 업로드 성공/실패 여부' })
  isCommit: boolean;

  private constructor(args: Ctor) {
    super();

    if (args) {
      this.filename = args.filename;
      this.url = args.url;
      this.mimeType = args.mimeType;

      // NOTE: 초기화
      this.isCommit = false;
    }
  }

  static of(args: Ctor) {
    return new File(args);
  }

  commit() {
    this.isCommit = true;
  }
}
