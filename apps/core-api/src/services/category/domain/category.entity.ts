import { DddAggregate } from '@libs/ddd';
import { Series } from '@services/series/domain/series.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

type Ctor = {
  name: string;
};

@Entity()
export class Category extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: '카테고리 이름' })
  name: string;

  @ManyToMany(() => Series, (series) => series.categories)
  seriesList: Series[];

  private constructor(args: Ctor) {
    super();

    if (args) {
      this.name = args.name;
    }
  }

  static of(args: Ctor) {
    return new Category(args);
  }

  update(args: { name: string }) {
    this.name = args.name;
  }
}
