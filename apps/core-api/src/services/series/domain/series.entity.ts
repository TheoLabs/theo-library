import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { SeriesStatus } from '@theo-library/shared';

type Ctor = {
  thumbnailImageUrl: string;
  title: string;
  description: string;
};

@Entity()
export class Series extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 400, comment: '썸네일 이미지 URL' })
  thumbnailImageUrl: string;

  @Column({ comment: '시리즈 제목' })
  title: string;

  @Column({ type: 'text', comment: '설명 및 줄거리' })
  description: string;

  @Column({ type: 'enum', enum: SeriesStatus, comment: '시리즈 상태' })
  status: SeriesStatus;

  // @Column({ comment: '태그'})
  // tags:

  private constructor(args: Ctor) {
    super();

    if (args) {
      // NOTE: 초기화
      this.status = SeriesStatus.PENDING;
    }
  }

  static of(args: Ctor) {
    return new Series(args);
  }
}
