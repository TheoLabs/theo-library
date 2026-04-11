import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Client } from '../domain/client.model';
import { ClientStatus } from '@theo-library/shared';
import { checkInValue, checkLikeValue, convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class ClientRepository extends DddRepository<Client> {
  entityClass = Client;

  async find(
    conditions: { id?: number; status?: ClientStatus; searchKey?: string; searchValue?: string },
    options?: TypeormRelationOptions<Client>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        status: conditions.status,
        ...checkLikeValue({
          searchKey: conditions.searchKey,
          searchValue: conditions.searchValue,
        }),
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; status?: ClientStatus; searchKey?: string; searchValue?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        status: conditions.status,
        ...checkLikeValue({
          searchKey: conditions.searchKey,
          searchValue: conditions.searchValue,
        }),
      }),
    });
  }
}
