import { DddRepository } from '@libs/ddd';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { Series } from '@services/series/domain/series.entity';

@Injectable()
export class SeriesRepository extends DddRepository<Series> {
  entityClass = Series;

  async find(conditions: { id?: number }, options?: TypeormRelationOptions<Series>) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
      }),
    });
  }
}
