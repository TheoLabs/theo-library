import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { type CalendarDate, SeriesStatus } from '@theo-library/shared';
import { Category } from '@services/category/domain/category.entity';

type Ctor = {
  thumbnailImageUrl: string;
  title: string;
  summary: string;
  author: string;
  illustrator: string;
  publisher: string;
  publishedOn?: CalendarDate;
  publicationCycleDay: number;
};

@Entity()
export class Series extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 400, comment: '썸네일 이미지 URL' })
  thumbnailImageUrl: string;

  @Column({ comment: '시리즈 제목' })
  title: string;

  @Column({ type: 'text', comment: '시리즈 요약' })
  summary: string;

  @Column({ comment: '작가' })
  author: string;

  @Column({ comment: '일러스트레이터' })
  illustrator: string;

  @Column({ comment: '발행처' })
  publisher: string;

  @Column({ nullable: true, comment: '시리즈 최초 발행일' })
  publishedOn?: CalendarDate;

  @Column({ comment: '연재 주기일' })
  publicationCycleDay: number;

  @Column({ type: 'enum', enum: SeriesStatus, comment: '시리즈 상태' })
  status: SeriesStatus;

  @Column({ comment: '현재까지 발행된 총 회차 수' })
  totalEpisodeCount: number;

  @ManyToMany(() => Category, (category) => category.seriesList)
  @JoinTable({ name: 'series_categories' })
  categories: Category[];

  private constructor(args: Ctor) {
    super();

    if (args) {
      this.thumbnailImageUrl = args.thumbnailImageUrl;
      this.title = args.title;
      this.summary = args.summary;
      this.author = args.author;
      this.illustrator = args.illustrator;
      this.publisher = args.publisher;
      this.publishedOn = args.publishedOn;
      this.publicationCycleDay = args.publicationCycleDay;

      // NOTE: 초기화
      this.status = SeriesStatus.PENDING;
      this.totalEpisodeCount = 0;
    }
  }

  static of(args: Ctor) {
    return new Series(args);
  }
}
