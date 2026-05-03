import { DddRepository } from '@libs/ddd';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { License } from '@services/license/domain/license.entity';
import { LicenseStatus } from '@theo-library/shared';

@Injectable()
export class LicenseRepository extends DddRepository<License> {
  entityClass = License;

  async find(
    conditions: { id?: number; clientId?: number; seriesId?: number; status?: LicenseStatus },
    options?: TypeormRelationOptions<License>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        clientId: conditions.clientId,
        seriesId: conditions.seriesId,
        status: conditions.status,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; clientId?: number; seriesId?: number; status?: LicenseStatus }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        clientId: conditions.clientId,
        seriesId: conditions.seriesId,
        status: conditions.status,
      }),
    });
  }
}
