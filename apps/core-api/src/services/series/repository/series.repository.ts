import { DddRepository } from '@libs/ddd';
import { checkInValue, convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { Series } from '@services/series/domain/series.entity';
import { SeriesStatus } from '@theo-library/shared';

@Injectable()
export class SeriesRepository extends DddRepository<Series> {
  entityClass = Series;

  async find(
    conditions: { id?: number; title?: string; statuses?: SeriesStatus[] },
    options?: TypeormRelationOptions<Series>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        title: conditions.title,
        status: checkInValue(conditions.statuses),
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; title?: string; statuses?: SeriesStatus[] }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        title: conditions.title,
        status: checkInValue(conditions.statuses),
      }),
    });
  }
}
